module.exports = {
    list(request, h) {
        return [
            {
                id: 1,
                name: "Fernando Papito",
                number: "11 999999999",
                description: "Solicitar consultoria em DevOps",
            },
            {
                id: 2,
                name: "João da Silva",
                number: "11 999999999",
                description: "Solicitar para aulas de inglês",
            },
            {
                id: 3,
                name: "Maria da Silva",
                number: "11 999999999",
                description: "Solicitar para aulas de francês",
            },
        ]
    }
}