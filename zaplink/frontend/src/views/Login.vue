<template>
  <div class="container">
    <section class="hero is-fullheight">
      <div class="hero-body">

        <div class="columns">

            <div class="column is-6 custom-center">
            <img src="../assets/logo.svg" alt="Logo ZapLink" />
            <h1 class="title is-4">Seu gerenciador de contatos rápidos</h1>

            <div class="card login">
                <div class="card-content">
                <form>
                    <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" v-model="form.email" type="email" placeholder="Seu email" />
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" v-model="form.password" type="password" placeholder="Sua senha"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button type="button" @click="login()" class="button is-success">Entrar</button>
                    </p>
                    </div>
                </form>
                </div>
            </div>
            </div>

            <div class="column is-6">
                <img src="../assets/landing.svg" alt="Marca"/>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      // console.log(this.form);
      window.axios.post('/session', this.form).then(async (res) => {
        const resposta = await res.data;
        localStorage.setItem('user_token', resposta.userToken);
        this.$router.push('/dashboard');
      })
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  border-radius: 10px;
}

.custom-center {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}
</style>