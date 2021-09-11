import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

app.get('/matricula', async (req, resp) => {
    try {
        let alunos = await db.tb_matricula.findAll({ order: [['id_matricula', 'desc']] });
        resp.send(alunos);
    } catch (error) {
        resp.send({ erro: error.toString() })
    }
})

app.post('/matricula', async (req, resp) => {
    try {
        let { nome, chamada, curso, turma } = req.body;

        let consulta = await db.tb_matricula.findOne({ where: {nr_chamada: chamada, nm_turma: turma}})
        

        if(consulta != null){
            resp.send({ erro: "Aluno já existe"})
        } else {
            if(nome == "" || chamada == "" || curso== "" || turma == "")
            {
                resp.send({ erro: 'algum campo está nulo'})
            } else {
                let r = await db.tb_matricula.create({
                    nm_aluno: nome,
                    nr_chamada: chamada,
                    nm_curso: curso,
                    nm_turma: turma
                })
                resp.send(r)
            }
        }   
    } catch (error) {
        resp.send({ erro: error.toString() })
    }
})

app.put('/matricula/:id', async (req, resp) => {
    try {
            let { nome, chamada, curso, turma } = req.body;
            let { id } = req.params;

            let r = await db.tb_matricula.update(
            {
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma
            },
            {
                where: { id_matricula: id }
            }
        )
        resp.sendStatus(200);
    } catch (error) {
        resp.send({ erro: error.toString() })
    }
})

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let { id } = req.params;
        let r = await db.tb_matricula.destroy({ where: { id_matricula: id } })
        resp.sendStatus(200)
    } catch (error) {
        resp.send({ erro: error.toString() })
    }
})

app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))