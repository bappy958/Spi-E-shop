const fs = require('fs');
const content = 'MONGODB_URI=mongodb+srv://itznobita958_db_user:1256455322ob@cluster0.wxxhukm.mongodb.net/antygravitydb?retryWrites=true&w=majority\\nPORT=5000\\nOPENAI_API_KEY=sk-abcdqrstefgh5678abcdqrstefgh5678abcdqrst';
fs.writeFileSync('.env', content, { encoding: 'utf8' });
console.log('.env file created successfully with UTF-8 encoding.');
