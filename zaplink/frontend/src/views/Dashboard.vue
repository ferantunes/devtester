<template>
  <div class="dashboard">
    <h1>Seu gerenciador digital de contatos</h1>

    <ul>
      <li v-for="contact in contactList" :key="contact.id">
        <span>{{contact.name}}<span> <br>
        <small>{{contact.number}}</small> <br>
        <small>{{contact.description}}</small> <br>
        <button>Conversar</button>
        <button>Apagar</button>
      </li>
    </ul>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Dashboard',
  data() {
    return {
      contactList: [
        {
          id:1,
          name: 'Fernando Papito',
          number: '11 999999999',
          description: 'Solicitar consultoria em DevOps'
        },
        {
          id:2,
          name: 'João da Silva',
          number: '11 999999999',
          description: 'Solicitar para aulas de inglês'
        },
        {
          id:3,
          name: 'Maria da Silva',
          number: '11 999999999',
          description: 'Solicitar para aulas de francês'
        }
      ]
    }
  }
}
</script>
