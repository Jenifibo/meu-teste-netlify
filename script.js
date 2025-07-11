// --- CONFIGURAÇÕES DE LOGIN (MUDE AQUI) ---
const USERNAMES = ["seuusuario1", "usuario2"]; // Lista de usuários permitidos
const PASSWORDS = ["suasenha1", "senha2"];     // Lista de senhas correspondentes (na mesma ordem)

// --- ID DO ARQUIVO JSON NO GOOGLE DRIVE (MUDE AQUI) ---
// Cole aqui o ID do seu arquivo sinal.json. Exemplo: '1a2b3c4d5e6f7g8h9i0jklmnopqrstuvwxyz'
const JSON_FILE_ID = 'SEU_ID_DO_ARQUIVO_AQUI'; 

// URL base para acessar o arquivo JSON do Google Drive
const JSON_URL = `https://docs.google.com/uc?export=download&id=${JSON_FILE_ID}`;
// const JSON_URL = `https://drive.google.com/uc?export=download&id=${JSON_FILE_ID}`;

// --- FIM DAS CONFIGURAÇÕES ---

const loginContainer = document.getElementById('login-container');
const sinaisContainer = document.getElementById('sinais-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');
const sinalDisplay = document.getElementById('sinal-display');

// Função de login
function login() {
    const user = usernameInput.value;
    const pass = passwordInput.value;

    const userIndex = USERNAMES.indexOf(user);

    if (userIndex !== -1 && PASSWORDS[userIndex] === pass) {
        // Login bem-sucedido
        localStorage.setItem('loggedIn', 'true'); // Salva status de login
        showSinaisPage();
    } else {
        loginMessage.textContent = "Usuário ou senha incorretos.";
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('loggedIn'); // Remove status de login
    showLoginPage();
}

// Função para mostrar a página de sinais
async function showSinaisPage() {
    loginContainer.style.display = 'none';
    sinaisContainer.style.display = 'block';
    await fetchSinal(); // Busca o sinal na primeira vez
    setInterval(fetchSinal, 5000); // Atualiza o sinal a cada 5 segundos
}

// Função para mostrar a página de login
function showLoginPage() {
    loginContainer.style.display = 'block';
    sinaisContainer.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
    loginMessage.textContent = '';
}

// Função para buscar o sinal do Google Drive
async function fetchSinal() {
    try {
        const response = await fetch(JSON_URL);
        const data = await response.json();
        sinalDisplay.textContent = data.sinal;
        // Opcional: mudar cor do sinal
        if (data.sinal === "CALL") {
            sinalDisplay.style.color = "green";
        } else if (data.sinal === "PUT") {
            sinalDisplay.style.color = "red";
        } else {
            sinalDisplay.style.color = "#007bff"; // Azul padrão
        }
    } catch (error) {
        console.error("Erro ao buscar o sinal:", error);
        sinalDisplay.textContent = "Erro ao carregar sinal";
        sinalDisplay.style.color = "gray";
    }
}

// Verifica o status de login ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedIn') === 'true') {
        showSinaisPage();
    } else {
        showLoginPage();
    }
});