#!/usr/bin/env node
const path = require('path');

let inputData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { inputData += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    const { tool_name, tool_input } = data;
    const command = (tool_input && tool_input.command) || '';
    const filePath = (tool_input && (tool_input.file_path || tool_input.path)) || '';

    let blocked = false;
    let blockReason = '';

    // --- BASH: Prisma dangerous operations ---
    if (tool_name === 'Bash' && command) {
      if (/\bprisma\s+migrate\s+reset\b/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: prisma migrate reset — destroys all data. Use prisma migrate dev instead';
      }

      if (!blocked && /\bprisma\s+db\s+push\s+--force-reset\b/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: prisma db push --force-reset — destroys all data';
      }

      // SQL destructive operations
      if (!blocked && /\bDROP\s+(TABLE|DATABASE)\b/i.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: DROP TABLE/DATABASE — prevents database destruction';
      }

      if (!blocked && /\bTRUNCATE\b/i.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: TRUNCATE — prevents data loss';
      }

      if (!blocked && /\bDELETE\s+FROM\b/i.test(command) && !/\bWHERE\b/i.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: DELETE FROM without WHERE clause — prevents mass data deletion';
      }

      // Destructive git operations
      if (!blocked && /\bgit\s+(reset\s+--hard|push\s+--force|push\s+-f|clean\s+-fd|branch\s+-D)\b/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: destructive git operation — requires explicit user confirmation';
      }

      // .env file access (except safe templates)
      if (!blocked && isBlockedEnvRef(command)) {
        blocked = true;
        blockReason = 'BLOCKED: .env file access via shell — protects secrets. Use .env.example for templates';
      }

      // npm dangerous flags
      if (!blocked && /\bnpm\s+(install|i)\b.*--ignore-scripts/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: npm install --ignore-scripts — supply chain risk';
      }

      // Production deploy
      if (!blocked && /\bnpm\s+run\s+(deploy|build):prod\b/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: production deploy/build — prevents accidental production deployment';
      }
    }

    // --- FILE TOOLS: protect .env files ---
    if (!blocked && ['Read', 'Write', 'Edit'].includes(tool_name) && filePath) {
      if (isBlockedEnvFile(filePath)) {
        blocked = true;
        blockReason = 'BLOCKED: .env file access — protects secrets. Use .env.example for templates';
      }
    }

    if (blocked) {
      process.stderr.write(blockReason + '\n');
      process.exit(2);
    }
    process.exit(0);
  } catch (err) {
    process.stderr.write('Hook error: ' + err.message + '\n');
    process.exit(0);
  }
});

function isBlockedEnvFile(p) {
  if (!p) return false;
  const basename = path.basename(p);
  if (/\.env\.(example|sample|template)$/.test(basename)) return false;
  if (/^\.env$/.test(basename) || /^\.env\./.test(basename)) return true;
  return false;
}

function isBlockedEnvRef(cmd) {
  if (!cmd) return false;
  const envMatches = cmd.match(/\.env(\.[a-zA-Z0-9_-]+)?/g);
  if (!envMatches) return false;
  for (const match of envMatches) {
    if (!/\.env\.(example|sample|template)$/.test(match)) return true;
  }
  return false;
}
