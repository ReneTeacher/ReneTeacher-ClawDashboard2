const fs = require('fs');
const path = require('path');

function parseStatus(lines) { return { r: '🟢', text: 'idle' }; }
function parseTasks(lines) { return []; }
function parseLog(lines) { return []; }

function parseProjectMd(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const directory = path.dirname(filePath);

        // Try to read MEMORY.md in the same directory
        let memory = '';
        const memoryPath = path.join(directory, 'MEMORY.md');
        if (fs.existsSync(memoryPath)) {
            memory = fs.readFileSync(memoryPath, 'utf8');
        }

        // Scan for other documents (*.md) excluding PROJECT.md and MEMORY.md
        const docs = [];
        try {
            const files = fs.readdirSync(directory);
            files.forEach(file => {
                if (file.endsWith('.md') && file !== 'PROJECT.md' && file !== 'MEMORY.md') {
                    docs.push(file);
                }
            });
        } catch (e) {
            console.error('Error scanning docs:', e);
        }

        return {
            id: directory,
            memory: memory ? 'Found (' + memory.length + ' chars)' : 'Not Found',
            docs
        };
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error);
        return null;
    }
}

const result = parseProjectMd('/Users/david/Documents/git/tbdavid2019/ClawDashboard2/test_workspace/agent-alpha/PROJECT.md');
console.log(JSON.stringify(result, null, 2));
