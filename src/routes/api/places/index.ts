import Router from 'express-promise-router';
import {Request} from 'express';
import {Client} from '@googlemaps/google-maps-services-js';
import {randomBytes} from 'crypto'

const router = Router();
const client = new Client();

router.get('/', async (request: Request<any, any, any, {input: string, session?: string}>, response, next) => {
    console.log('attempting to get places');
    if (!process.env.PLACES_KEY) {
        return next(new Error('no key'));
    }
    const session = request.query.session ?? randomBytes(128).toString('hex');
    const placeResponse = await client.placeAutocomplete({params: {input: request.query.input, sessiontoken: session, components: ['country:au'], key: process.env.PLACES_KEY, location: {lat: -35.2809, lng: 149.1300}, radius: 24279}});
    return response.json({results: placeResponse.data.predictions.map(place => place.description), session});
})

export default router;