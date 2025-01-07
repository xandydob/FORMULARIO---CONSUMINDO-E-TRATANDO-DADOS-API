async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro'); //localizamos a di no html
    mensagemErro.innerHTML = "";// E vamos iniciar com nenhuma mensagem. Então, mensagemErro.innerHTML = "". Não vai ter nada dentro dele.
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = '<p> CEP inválido, tente novamente!</p>'; 
        console.log(erro);
    }
}

var cep = document.getElementById('cep'); //criou a variavel cep e atribuiu a ela uma pesquisa no html inteiro a procurar pelo id cep.
cep.addEventListener("focusout", () => buscaEndereco(cep.value)); /* defini um ouvinte de eventos, o focusout é um evento que ocorre 
quando a pessoa clica na parte de fora dele, ou seja ao escrever o CEP ela clicou naquele campo e ele está com foco ativo, após 
escrever qualquerlugar que ela clicar vai tirar o focu isso é focusout.Quando ele acontece, chama o buscaEndereço, e manda o valor do CEP
Lembra que tínhamos feito essa parte mais dinâmica no promise.all? Ele recebe um parâmetro e altera - conforme o parâmetro que recebe
 - a URL do viaCEP?*/
 

/* --- Lidando com várias requisições ao mesmo tempo com Promise.all ---

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

*/