// Base de profissionais — CHAMA Serviços
// Em produção isso viria de uma API/back-end. Aqui é só demonstração.

const PROFISSIONAIS = [
  {
    id: "p1",
    nome: "Zé da Elétrica",
    categoria: "Elétrica",
    icone: "⚡",
    nota: 4.9,
    avaliacoes: 132,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 80",
    tags: ["Instalações", "Curto-circuito", "Iluminação", "Quadros"],
    sobre:
      "20 anos resolvendo problema de fiação sem enrolação. Atende emergência no mesmo dia.",
  },
  {
    id: "p2",
    nome: "Buendía Hidráulica",
    categoria: "Hidráulica",
    icone: "🔧",
    nota: 4.8,
    avaliacoes: 98,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 90",
    tags: ["Vazamentos", "Encanamento", "Caixa d'água", "Registros"],
    sobre:
      "Especialista em vazamento escondido. Chega com detector e sai com o problema resolvido.",
  },
  {
    id: "p3",
    nome: "Dona Vera Faxina",
    categoria: "Limpeza",
    icone: "🧽",
    nota: 5.0,
    avaliacoes: 210,
    cidade: "São José dos Pinhais, PR",
    precoBase: "a partir de R$ 120",
    tags: ["Faxina pesada", "Pós-obra", "Organização", "Vidros"],
    sobre:
      "Faxina que deixa a casa parecendo de revista. Equipe própria, produtos inclusos.",
  },
  {
    id: "p4",
    nome: "CTRL+F Informática",
    categoria: "Tecnologia",
    icone: "🖥️",
    nota: 4.7,
    avaliacoes: 76,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 70",
    tags: ["Formatação", "Vírus", "Redes", "Backup"],
    sobre:
      "Conserta computador que trava, notebook que esquenta e rede que cai toda hora.",
  },
  {
    id: "p5",
    nome: "Motor Vivo Auto Center",
    categoria: "Automotivo",
    icone: "🚗",
    nota: 4.6,
    avaliacoes: 154,
    cidade: "Pinhais, PR",
    precoBase: "a partir de R$ 150",
    tags: ["Revisão", "Freios", "Suspensão", "Diagnóstico"],
    sobre: "Diagnóstico honesto antes de qualquer orçamento. Sem susto na hora de pagar.",
  },
  {
    id: "p6",
    nome: "Verde Vivo Jardinagem",
    categoria: "Jardinagem",
    icone: "🌿",
    nota: 4.9,
    avaliacoes: 61,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 100",
    tags: ["Poda", "Grama", "Paisagismo", "Manutenção"],
    sobre: "Transforma quintal esquecido em lugar que dá vontade de tomar café.",
  },
  {
    id: "p7",
    nome: "Pet Estilo Banho & Tosa",
    categoria: "Pet Shop",
    icone: "🐶",
    nota: 4.8,
    avaliacoes: 189,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 60",
    tags: ["Banho", "Tosa", "Hidratação", "Unhas"],
    sobre: "Atende cachorro medroso com toda paciência do mundo. Leva e traz em casa.",
  },
  {
    id: "p8",
    nome: "Chaveiro Relâmpago",
    categoria: "Chaveiro",
    icone: "🔑",
    nota: 4.9,
    avaliacoes: 143,
    cidade: "Curitiba, PR",
    precoBase: "a partir de R$ 65",
    tags: ["Chave perdida", "Fechadura", "Cópia", "24h"],
    sobre: "Ficou trancado do lado de fora? Chega em até 30 minutos, qualquer hora.",
  },
];

function getProfissionalPorId(id) {
  return PROFISSIONAIS.find((p) => p.id === id);
}
