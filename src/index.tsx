import path from "path";
import fs from "fs-extra";
import { Application, JSX,  ParameterType, RendererEvent } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "gtmWorkspaceId",
    type: ParameterType.String,
    help: "Google Tag Manager Workspace ID",
  });

  app.renderer.hooks.on("body.begin", (ctx) => {
   const tagId = ctx.options.getValue("gtmWorkspaceId");

   // @ts-ignore
   return <script id="gtm" tagId={tagId} src={ctx.relativeURL('assets/gtm.js')}></script>
}); 

  app.renderer.on(RendererEvent.END, (ctx) => {
	const defaultRootPath = path.join(process.cwd(), 'docs');
	const rootPath = app.options.getValue('out') || defaultRootPath;

    const sourceAsset = path.join(__dirname, './assets/gtm.js');
	fs.ensureDirSync(path.join(rootPath, 'assets'));
	fs.copyFileSync(
		sourceAsset,
		path.join(rootPath, 'assets/gtm.js')
	);
  });

  app.renderer.hooks.on("body.end", (ctx) => {
    const tagId: string = ctx.options.getValue("gtmWorkspaceId") as string;

    return (
        <noscript>
            <iframe 
                src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(tagId)}`}
                height={0} width={0}
                style="display:none;visibility:hidden">
            </iframe>
        </noscript>
    );
  });
}