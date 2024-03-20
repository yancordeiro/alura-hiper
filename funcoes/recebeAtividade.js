const pubsub = require('./pubsub');
module.exports = async function recebeAtividades(requisicao, resposta) {
    const atividade = requisicao.body;

    if(atividade.hasOwnProperty('data_criacao_atividade') === false){
        resposta.send("o campo data_criacao_atividade nao foi enviado")
        return
    }

    const tiposDeAtividade = ['criar-pergunta', 'responder-pergunta']
    if(tiposDeAtividade.indexOf(atividade.tipo_de_atividade) === -1){
        resposta.send("o campo tipo_de_atividade nao foi enviado")
        return
    }

    if(atividade.hasOwnProperty('nome_do_curso') === false){
        resposta.send("o campo nome_do_curso nao foi enviado")
        return
    }

    if(atividade.hasOwnProperty('nome_da_aula') === false){
        resposta.send("o campo nome_da_aula nao foi enviado")
        return
    }

    if(atividade.hasOwnProperty("texto") === false){
        resposta.send("o campo texto nao foi enviado")
        return
    }

    if(atividade.texto.length > 255){
        resposta.send("o campo texto deve ter no maximo 255 caracteres")
        return
    }

    const resultado = await pubsub(atividade, 'atividades');
    console.log(atividade);
    resposta.send(resultado);
}