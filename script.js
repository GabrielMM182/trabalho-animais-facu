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
// const urlPost = 'https://news-api-node.herokuapp.com/api/v1/news/92b5a2a5-0ab5-48ad-90a6-9be44d918f99'
const postFeitos = document.querySelector('.post-feitos')

const novosElementos = (mensagemNova, novoElementoAtribuido) => {
    const novoElemento = novoElementoAtribuido
    const novaMensagem = mensagemNova
    novoElemento.appendChild(novaMensagem)
    postFeitos.appendChild(novoElemento)  
}

function mostrarMensagens() {

    fetch(urlPost)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        if(postFeitos) {
            data.forEach(dados => {
                var mensagemNova = document.createTextNode(dados.post)
                var novoElemento = document.createElement('p')
                novosElementos(mensagemNova, novoElemento)
            });
        }

    });

}
mostrarMensagens()


function enviarMensagem() {

    if(botao) {
        botao.addEventListener('click', function() {
            var poster = {
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
                        var mensagemNova = document.createTextNode(data.post)
                        var novoElemento = document.createElement('p')
                        novosElementos(mensagemNova, novoElemento)
                    }
            
                });
        })
    }

}
enviarMensagem()