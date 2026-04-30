#!/usr/bin/env node

let inputData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { inputData += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);
    const { tool_name, tool_input } = data;
    const filePath = (tool_input && (tool_input.file_path || tool_input.path)) || '';
    const content = (tool_input && (tool_input.content || tool_input.new_string)) || '';

    let blocked = false;
    let blockReason = '';

    // --- WRITE/EDIT: Block dangerouslySetInnerHTML in React components ---
    if (['Write', 'Edit'].includes(tool_name) && filePath && content) {
      const isReactFile = /\.(tsx|jsx)$/.test(filePath);

      if (isReactFile) {
        // Block dangerouslySetInnerHTML
        if (/dangerouslySetInnerHTML/.test(content)) {
          blocked = true;
          blockReason = 'BLOCKED: dangerouslySetInnerHTML in React component — XSS risk. Use a sanitization library (DOMPurify) or render safe content directly';
        }

        // Block inline style objects with url() — potential CSS injection
        if (!blocked && /style\s*=\s*\{[^}]*url\s*\(/.test(content)) {
          blocked = true;
          blockReason = 'BLOCKED: inline style with url() in React component — potential CSS injection. Use Tailwind classes or CSS modules instead';
        }

        // Warn about any type assertions on props
        if (!blocked && /as\s+any\b/.test(content) && /props|Props/.test(content)) {
          blocked = true;
          blockReason = 'BLOCKED: "as any" type assertion on React props — defeats TypeScript safety. Define proper prop types instead';
        }
      }
    }

    // --- BASH: Block disabling TypeScript strict mode ---
    if (!blocked && tool_name === 'Bash' && tool_input && tool_input.command) {
      const command = tool_input.command;

      // Block disabling strict mode in tsconfig
      if (/\"strict\"\s*:\s*false/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: disabling TypeScript strict mode — maintain type safety';
      }

      // Block skipping TypeScript checks in build
      if (/TSC_COMPILE_ON_ERROR\s*=\s*true/.test(command)) {
        blocked = true;
        blockReason = 'BLOCKED: TSC_COMPILE_ON_ERROR=true — do not bypass TypeScript errors';
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
