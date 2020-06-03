import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
import { XMLHttpRequestPlugin } from '@opentelemetry/plugin-xml-http-request';
import { UserInteractionPlugin } from '@opentelemetry/plugin-user-interaction';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { HttpTraceContext  } from '@opentelemetry/core';

const exporter = new CollectorExporter({
  serviceName: 'todo-client',
  url: 'http://localhost:30011/v1/trace',
});

const providerWithZone = new WebTracerProvider({
  plugins: [
    new UserInteractionPlugin(),
    new XMLHttpRequestPlugin({
      ignoreUrls: [/localhost:8090\/sockjs-node/],
      //propagateTraceHeaderCorsUrls: [
      //  'https://localhost:30009',
      //],
    }),
  ],
});

providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new CollectorExporter(exporter)));

providerWithZone.register({
  contextManager: new ZoneContextManager(),
  propagator: new HttpTraceContext(),
});
