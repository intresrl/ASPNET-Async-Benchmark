import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';

const duration = 30;

export const options = {
    discardResponseBodies: true,
    scenarios: {
        long_sync: {
            executor: 'constant-vus',
            exec: 'long_request_sync',
            vus: 2,
            duration: duration + 's',
            tags: { type: 'long_sync' },
        },
        short_while_sync: {
            executor: 'constant-vus',
            exec: 'short_while_sync_request',
            vus: 1,
            duration: duration + 's',
            tags: { type: 'short_while_sync' },
        },
        long_async: {
            executor: 'constant-vus',
            exec: 'long_request_async',
            vus: 2,
            startTime: duration + 5 + 's',
            duration: duration + 's',
            tags: { type: 'long_async' },
        },
        short_while_async: {
            executor: 'constant-vus',
            exec: 'short_while_async_request',
            vus: 1,
            startTime: duration + 5 + 's',
            duration: duration + 's',
            tags: { type: 'short_while_async' },
        },
    },
};

const trend_short_while_async = new Trend('duration_short_while_async');
const trend_short_while_sync = new Trend('duration_short_while_sync');
const trend_long_async = new Trend('duration_long_async');
const trend_long_sync = new Trend('duration_long_sync');
const counter_short_while_async = new Counter('counter_short_while_async');
const counter_short_while_sync = new Counter('counter_short_while_sync');


export function short_while_sync_request() {
    const r = http.get('http://localhost:5260/short');
    trend_short_while_sync.add(r.timings.duration);
    counter_short_while_sync.add(1);
}
export function short_while_async_request() {
    const r = http.get('http://localhost:5260/short');
    trend_short_while_async.add(r.timings.duration);
    counter_short_while_async.add(1);
}
export function long_request_sync() {
    const r = http.get('http://localhost:5260/long-sync');
    trend_long_sync.add(r.timings.duration);
}
export function long_request_async() {
    const r = http.get('http://localhost:5260/long-async');
    trend_long_async.add(r.timings.duration);
}
