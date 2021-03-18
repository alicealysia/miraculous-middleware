import Router from 'express-promise-router'
import {xero, database} from '../../../library'
import returnSuccess from '../returnSuccess'
const router = Router();

router.get('/consent', async (request, response, next) => {
    const consentUrl = await xero.getConsentUrl().catch(error => next(error));
    return response.send(consentUrl);
})

router.get('/token', async (request, response, next) => {
    const token = await xero.apiCallback(request.url);
    database.user.setXero(request.User.id, JSON.stringify(token));
    return next();
}, returnSuccess);

router.put('/token', async (request, response, next) => {
    const token = await xero.refresh();
    database.user.setXero(request.User.id, JSON.stringify(token));
    return next();
}, returnSuccess)

router.get('/quotes', async (request, response, next) => {
    return xero.getQuotes(request.User, request.query.quoteId as string || undefined).then(quotes => response.json(quotes)).catch(error => next(error));
});

router.get('/invoices', async (request, response, next) => {
    return xero.getInvoices(request.User, request.query.invoiceId as string || undefined).then(invoices => response.json(invoices)).catch(error => next(error));
})

router.post('/quotes', async (request, response, next) => {
    await xero.createQuote(request.User, request.body).catch(error => next(error));
    return next();
})

router.post('/invoices', async (request, response, next) => {
    await xero.createInvoice(request.User, request.body).catch(error => next(error));
    return next();
})

export default router;