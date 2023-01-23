import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
  } from 'next/document';
  import { ServerStyleSheet } from 'styled-components';
  
  class MyDocument extends Document {
    // static async getInitialProps(ctx: DocumentContext) {
    //   const sheet = new ServerStyleSheet();
    //   const originalRenderPage = ctx.renderPage;
    //   try {
    //     ctx.renderPage = () =>
    //       originalRenderPage({
    //         enhanceApp: (App) => (props) =>
    //           sheet.collectStyles(<App {...props} />)
    //       });
  
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return {
    //       ...initialProps,
    //       styles: (
    //         <>
    //           {initialProps.styles}
    //           {sheet.getStyleElement()}
    //         </>
    //       )
    //     };
    //   } finally {
    //     sheet.seal();
    //   }
    // }
    


    render() {
      return (
        <Html>
          <Head >
            <link rel="stylesheet" href="https://a.slack-edge.com/bv1-10/client-boot-styles.97ae0af.min.css?cacheKey=gantry-1674265642" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="https://a.slack-edge.com/bv1-10/slack-kit-styles.0af9bca.min.css?cacheKey=gantry-1674265642" crossOrigin="anonymous"></link>
            <link rel="shortcut icon" href="https://a.slack-edge.com/cebaa/img/ico/favicon.ico" />
            <link href="https://a.slack-edge.com/bv1-10/slack-icons-v2-fe043a5.woff2" rel="preload" as="font" crossOrigin="anonymous"/>
            <link href="https://a.slack-edge.com/bv1-10/lato-regular-d9ce515.woff2" rel="preload" as="font" crossOrigin="anonymous"></link>
            <link href="https://a.slack-edge.com/bv1-10/lato-black-b64f5e4.woff2" rel="preload" as="font" crossOrigin="anonymous"></link>
            <link href="https://a.slack-edge.com/bv1-10/lato-bold-4b1dc11.woff2" rel="preload" as="font" crossOrigin="anonymous"></link>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;