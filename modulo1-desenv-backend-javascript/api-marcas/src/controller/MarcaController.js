import objService from "../service/MarcaService.js"

class MarcaController {
    async retornarMarcaComMaisModelos(req, res) {
        try {
            res.status(200).json({ success: true, marca: await objService.retornarMarcaPorOrdenacaoQtdeModelos('desc') });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    }

    async retornarMarcaComMenosModelos(req, res) {
        try {
            res.status(200).json({ success: true, marca: await objService.retornarMarcaPorOrdenacaoQtdeModelos('asc') });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    }

    async retornarMarcasComMaisModelosLimit(req, res) {
        try {
            res.status(200).json({ success: true, marcas: await objService.retornarMarcasPorOrdenacaoQtdeModelosLimit('desc', req.params.limite) });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    }

    async retornarMarcasComMenosModelosLimit(req, res) {
        try {
            res.status(200).json({ success: true, marcas: await objService.retornarMarcasPorOrdenacaoQtdeModelosLimit('asc', req.params.limite) });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    }

    async retornarListaModelosPorMarca(req, res) {
        try {
            res.status(200).json({ success: true, modelos: await objService.retornarListaModelosPorMarca(req.body) });
        } catch (error) {
            res.status(400).json({ success: false, msg: error.message });
        }
    }
}

export default new MarcaController();