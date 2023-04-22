import { Application, JSX, ParameterType } from "typedoc";

export function load(app: Application): void {
  app.options.addDeclaration({
    name: "gtmWorkspaceId",
    type: ParameterType.String,
    help: "Google Tag Manager Workspace ID",
  });

  app.renderer.hooks.on("head.end", (ctx) => {
    const tagId = ctx.options.getValue("gtmWorkspaceId");

    // @ts-ignore
    return <script dangerouslySetInnerHTML={{__html: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${tagId}');</script>
<!-- End Google Tag Manager -->`}}></script>
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