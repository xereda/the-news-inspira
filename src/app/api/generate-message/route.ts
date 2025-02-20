// src/app/api/generate-message/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Replace with your actual API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    'GEMINI_API_KEY is not defined in your .env.local or environment variables.',
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  //   model: 'gemini-2.0-flash-lite-preview-02-05',
  model: 'gemini-2.0-pro-exp-02-05',
});

const generationConfig = {
  temperature: 1, // Adjust for more or less randomness
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 2048, // Adjust as needed
};

// Obtém a data atual
const dataAtual = new Date();

// Formata a data para o formato desejado
const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Sao_Paulo',
});

// Define the chat history for the prompt
const chatHistory = [
  {
    role: 'user',
    parts: [
      {
        text: `Data atual: ${dataFormatada}. 
        (não esqueça de considerar a data de hoje informado aqui ao lado, 
        incluindo o dia da semana)
        Observe o padrão de mensagens abaixo e gere uma nova com o mesmo tom, 
        técnica e intenção de comunicação. Opte por um tom mas leve e humor inteligente.
        Não se esqueça que todos os exemplos estão em lowercase, isso faz parte do padrão.
        Considere a data informada acima e caso 
        seja um feriado nacional brasileiro, tente encaixar o tema na mensagem. 
        Considere, eventualmente, relacionar o dia da semana na mensagem, 
        como é apresentada em alguns exemplos abaixo. 
        Quando possível, encaixe emojis:

bom dia. se o caminho parece longo, lembre que cada passo já te deixa mais perto. segunda-feira é o primeiro deles. pegue seu café sem açúcar e siga em frente. let's go!

bom dia. hoje a mensagem é a frase preferida do estagiário: a comparação é o ladrão da alegria. a grama do vizinho pode ser mais verde, mas você só vai ser feliz quando amar o que é seu.

bom dia. essa vai para todos vocês que não ficam sem ler nosso jornal um dia, mas ficam aí quietinhos: nunca sequer indicaram para os amigos, muitos menos compartilharam nos stories. estagiário está de olho… risos.

bom dia. hoje é a edição perfeita para lembrar do que deveria ser óbvio: agradecer mais, reclamar menos. enxergue o que tem, não só o que falta. desça um pouco mais para entender.

bom dia. se a vida fosse só esperar o momento certo, ninguém sairia do lugar. começa com o que você tem e ajusta no caminho. meio da semana, let’s go.

bom dia. mais uma semana se inicia. leve pra frente o que foi bom, e aprenda com o que não te fez bem. se repetir esse processo a cada dia, a cada semana e a cada mês, terá um ano e uma vida melhor. vamos nessa!

bom dia. o mundo muda. o que era dado como verdade ontem pode não ser mais hoje. quem tem certeza demais pode estar deixando de aprender. lembre que questionar não é fraqueza, mas sinal de curiosidade e crescimento.

bom dia. depois de 57 dias, chegou o último dia do mês. é hora de olhar pra trás e ver como foi o 1º mês do ano, e para frente para planejar os próximos. bora.

bom dia. você pode enxergar qualquer situação de três maneiras: a mais positiva, a mais neutra e a mais negativa. escolha a primeira, no máximo a segunda. sempre evite a terceira.

bom dia. mais uma vez chegou o seu jornal favorito. pegue seu café — sem açúcar — para começar seu dia bem e informado. vamos nessa!

bom dia. mesmo os mais generosos do mundo não podem fazer uma coisa específica por você: a sua parte. levante, pegue seu café e faça o que precisa ser feito. agora, hoje — não depois.

bom dia. muitos perguntam por qual motivo insistimos no café sem açúcar, e o motivo é mais simples do que parece: te ajudar a acostumar com a vida, onde nem tudo é “saboroso” e exige sacrifícios.

bom dia. está dada a largada do melhor ano da sua vida. seja lá onde estiver, comece com a convicção de que o plantio é opcional, mas a colheita é sempre obrigatória. vamos por mais!

bom dia. chegamos ao fim de 2024, hora de planejar seu futuro e desenhar suas metas para o ano que vem. tire um momento, no entanto, para relembrar e agradecer tudo o que viveu neste ano — incluindo as pessoas

bom dia. essa vai para a turma que teve confraternização de firma ontem. ainda que a ressaca tenha batido, veja essa mensagem como motivação para levantar e fazer o que precisa ser feito. vamos nessa!

bom dia. se você não tem maturidade, talvez seja melhor não se dar a oportunidade. se está de dieta, é melhor não passar perto do seu prato predileto. evitar, muitas vezes, é preciso.

bom dia. não tente demonstrar o quão bom você é em algo o tempo todo. no lugar disso, considere escutar e ficar interessado no que os outros têm de bom. você vai se surpreender.

bom dia. hoje não é páscoa, não é natal, não é ano novo, muito menos dia do amigo. mesmo assim, marque aqui alguém que você gosta e admira. não espere datas especiais para isso.

bom dia. hoje não é páscoa, não é natal, não é ano novo, muito menos dia do amigo. mesmo assim, marque aqui alguém que você gosta e admira. não espere datas especiais para isso.

bom dia. assim como um peixe que se perde no oceano ao ser levado pela maré, geralmente, ao somente seguir com a maioria você se distancia do seu — seu — objetivo. pense nisso.

bom dia. além de deixar você bem e informado todos os dias, o seu jornal favorito também é bem generoso e está doido para te dar um presente bem bacana. leia até o final pra entender.

bom dia. a vida fica bem mais legal quando você deixa de ficar tentando ser melhor que os outros e foca em ser melhor para os outros. entenda a diferença e seja útil.

bom dia. saímos oficialmente do mood de halloween e passamos para a parte do ano em que as lojas ficam cheias de enfeites de natal. por aqui, pode ser que o papai noel tenha chegado adiantado. leia até o final.

bom dia. não adianta viver esperando o momento perfeito chegar para ser feliz. a vida é o que acontece enquanto estamos fazendo outros planos. enjoy.

bom dia. como dizem por aí, segunda-feira é o dia mundial das oportunidades. aproveite o gás para fazer tudo que precisa ser feito e começar a semana bem. pegue seu café e vamos para a leitura.

bom dia. assim como a sua alegria, generosidade e autenticidade contagiam o mundo ao seu redor, a sua tristeza e raiva também têm influência. escolha bem o que vai entregar a quem está a sua volta.

bom dia. você já parou pra pensar como uma companhia muda tudo? em vez de seguir no piloto automático, seja criterioso com as pessoas ao seu redor.
`,
      },
    ],
  },
];

export async function POST(req: Request) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });

    console.log(JSON.stringify(chatHistory));

    const result = await chatSession.sendMessage(
      'gere outra mensagem motivacional no mesmo estilo',
    );
    const responseText = result.response.text();

    return NextResponse.json({ message: responseText });
  } catch (error: any) {
    console.error('Error generating message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
