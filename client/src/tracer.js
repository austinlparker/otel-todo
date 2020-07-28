import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
import { XMLHttpRequestPlugin } from '@opentelemetry/plugin-xml-http-request';
import { UserInteractionPlugin } from '@opentelemetry/plugin-user-interaction';
import { DocumentLoad } from '@opentelemetry/plugin-document-load';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';

/* eslint-disable no-undef */
const collectorUrl = config.VUE_APP_ENV_Collector || 'http://localhost:30011/v1/trace'
const serverBaseUrl = config.VUE_APP_ENV_ServerBase || 'localhost:30005'
const baseLocation = window.location.hostname || 'localhost'
/* eslint-enable no-undef */

const exporterOptions = {
  serviceName: 'todo-client',
  url: collectorUrl,
};

const providerWithZone = new WebTracerProvider({
  plugins: [
    new DocumentLoad(),
    new UserInteractionPlugin(),
    new XMLHttpRequestPlugin({
      ignoreUrls: [new RegExp(`/${baseLocation}:8090/sockjs-node/`)],
      propagateTraceHeaderCorsUrls: new RegExp(`/${serverBaseUrl}/`),
    }),
  ],
});

providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new CollectorTraceExporter(exporterOptions)));

providerWithZone.register({
  contextManager: new ZoneContextManager()
});