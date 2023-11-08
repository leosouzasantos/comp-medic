# Agendamento de consulta médica

### **Funcionalidade**

---

### **Cadastramento de Usuário**

- [ ] Deve ser possivel o usuário realizar um cadastro
  - [ ] O usuário não precisa estar autenticado no sistema para se cadastrar.
  - [ ] Não deve ser possivel realizar o cadastro de um usuário sem o username e a senha.
  - [ ] Não deve ser possivel realizar um cadastro de username já existente.
  - [ ] Não deve ser possivel o usuário cadastrar a permissão de adminstrador.

---

### **Cadastro de Especialidade**

- [ ] Deve ser possível um usuário cadastrar uma especialidade
  - [ ] O usuário precisa estar autenticado na aplicação.
  - [ ] Não deve ser possível realizar o cadastro dee uma especialidade dupla.
  - [ ] O usuário precisa ter permissão de administrador.
  - [ ] Não deve ser possível cadastrar uma especialidade com nome vazio.

---

### **Cadastro de Médico**

- [ ] Deve ser possível cadastrar um médico
  - [ ] O médico deve possuir um CRM com 6 dígitos
  - [ ] O médico deve estar atrelado a um usuário
  - [ ] O médico deve ter uma e somente uma especialidade
  - [ ] Não deve ser possível cadastrar um médico sem CRM
