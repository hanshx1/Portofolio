// script.js
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');

const encryptedMessage = encryptMessage('Terimakasih buat waktunya Nindya... mungkin selama ini tidak menyadari rasa suka ku sampai kamu buka website ini tapi... walaupun suatu hari kau tak bersama ku aku senang pernah menjadi penghibur mu di masa smp, dan sampai saat ini aku belum bisa menghilangkan rasaku, sekian');

loginBtn.addEventListener('click', () => {
  const password = passwordInput.value.trim();
  if (password === 'nindya' || password === 'reyhand' || password === 'admin') {
    const decryptedMessage = decryptMessage(encryptedMessage, password);
    const blob = new Blob([decryptedMessage], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'decrypted_message.txt';
    a.click();
  } else {
    alert('Invalid password');
  }
});

function encryptMessage(message) {
  const key = 'my_secret_key'; // Replace with a secure key
  const iv = 'my_initialization_vector'; // Replace with a secure IV
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptMessage(encryptedMessage, password) {
  const key = password; // Use the password as the key
  const iv = 'my_initialization_vector'; // Replace with a secure IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}