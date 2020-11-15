const lex = document.querySelectorAll('.js-menu a[href^="#"]');

function scrollToSection(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const section = document.querySelector(href);

    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

lex.forEach ((link)=>{
    link.addEventListener('click', scrollToSection);
})

const botao = document.querySelector('.botao')
const mensagem = document.getElementById('mensagem')
const urlPost = 'https://news-api-node.herokuapp.com/api/v1/news/99b5b2a5-0ab5-48xd-94a6-9be55d918f99'
const postFeitos = document.querySelector('.post-feitos')

const novoElemento = (mensagemNova, novoElementoAtribuido) => {
    const novoElemento = novoElementoAtribuido
    const novaMensagem = mensagemNova
    novoElemento.appendChild(novaMensagem)
    postFeitos.appendChild(novoElemento)  
}

function exbirMensagens() {

    fetch(urlPost)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        if(postFeitos) {
            data.forEach(dados => {
                const mensagemNova = document.createTextNode(dados.post)
                const novoElemento = document.createElement('p')
                novoElemento(mensagemNova, novoElemento)
            });
        }

    });

}
exibirMensagens()


function enviarMensagem() {

    if(botao) {
        botao.addEventListener('click', function() {
            const poster = {
                post: mensagem.value
            };
        
            fetch(urlPost,
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(poster)
                })
                .then(results => results.json())
                .then(function(data) {

                    if(postFeitos) {
                        const mensagemNova = document.createTextNode(data.post)
                        const novoElemento = document.createElement('p')
                        novoElemento(mensagemNova, novoElemento)
                    }
            
                });
        })
    }

}
enviarMensagem()