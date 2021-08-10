import { promises as fs } from "fs";

export async function cadastrar(req, res) {
    try {
        let dadosConta = req.body;
        let retValidacao = await validarDadosConta(dadosConta);
        if (!retValidacao.success) {
            res.status(400).json(retValidacao);
        }
    
        // Validou? prossegue com o cadastro da conta
        let objArquivoContas = JSON.parse(await fs.readFile("json_accounts/file.json"));
        
        // Adiciona os dados da nova conta no JSON de contas
        let dadosContaComId = { id: objArquivoContas.nextId, name: dadosConta.name, balance: dadosConta.balance };
        objArquivoContas.accounts.push(dadosContaComId);
        objArquivoContas.nextId += 1;
    
        // Salva o arquivo - o terceiro parâmetro do stringify é a quantidade de espaços da tabulação, já salva arquivo formatado
        await fs.writeFile("json_accounts/file.json", JSON.stringify(objArquivoContas, null, 4));
    
        res.status(201).json({ success: true, msg: "Conta criada com sucesso", account: dadosContaComId });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

export async function listar(req, res) {
    try {
        let arrContas = JSON.parse(await fs.readFile("json_accounts/file.json")).accounts;
        res.status(200).json({ success: true, accounts: arrContas });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

export async function buscar(req, res) {
    try {
        let arrContas = JSON.parse(await fs.readFile("json_accounts/file.json")).accounts;
        let contaLocalizada = arrContas.find((item) => item.id == req.params.id);
        if (contaLocalizada == undefined) {
            res.status(404).json({ success: false, msg: "Conta ID " + req.params.id + " não localizada." });
        } else {
            res.status(200).send({ success: true, account: contaLocalizada });
        }
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

export async function atualizar(req, res) {
    try {
        let objArquivoContas = JSON.parse(await fs.readFile("json_accounts/file.json"));
        let arrContas = objArquivoContas.accounts;

        let contaLocalizada = arrContas.find((item) => item.id == req.params.id);
        if (contaLocalizada == undefined) {
            res.status(404).json({ success: false, msg: "Conta ID " + req.params.id + " não localizada." });
        } else {
            // Busca o índice da conta pesquisada, substitui os dados e grava novamente estas no arquivo
            let indiceContaNoArray = arrContas.findIndex((item) => item.id == req.params.id);
            objArquivoContas.accounts[indiceContaNoArray] = { id: objArquivoContas.accounts[indiceContaNoArray].id, name: req.body.name, balance: req.body.balance };
            await fs.writeFile("json_accounts/file.json", JSON.stringify(objArquivoContas, null, 4));

            res.status(200).send({ success: true, msg: "Conta ID " + req.params.id + " alterada com sucesso.", account: objArquivoContas.accounts[indiceContaNoArray] });
        }
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

export async function remover(req, res) {
    try {
        let objArquivoContas = JSON.parse(await fs.readFile("json_accounts/file.json"));
        let arrContas = objArquivoContas.accounts;

        let contaLocalizada = arrContas.find((item) => item.id == req.params.id);
        if (contaLocalizada == undefined) {
            res.status(404).json({ success: false, msg: "Conta ID " + req.params.id + " não localizada." });
        } else {
            // Monta um array com todas as contas DIFF da conta pesquisada e grava novamente estas no arquivo
            objArquivoContas.accounts = arrContas.filter((item) => item.id != req.params.id);
            await fs.writeFile("json_accounts/file.json", JSON.stringify(objArquivoContas, null, 4));

            res.status(200).send({ success: true, msg: "Conta ID " + req.params.id + " removida com sucesso." });
        }
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}

async function validarDadosConta(dados) {
    if (Object.keys(dados).length != 2) {
        return { success: false, message: "Dados da conta não preenchidos" }
    }

    return { success: true }
}