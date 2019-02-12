const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="#try">Try it out</Button>
            <Button href={docUrl('installation')}>Getting Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const WhyBuckaroo = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Why Buckaroo?</h2>
        <MarkdownBlock>
          Package managers like NPM, Yarn and Cargo have shown how productive developers can be when they can easily integrate a large ecosystem of projects.
          Buckaroo fills this gap for C++.
        </MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <div
        id="try"
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Try it out</h2>
          <img src={`${baseUrl}img/workflow.svg`} />
      </div>
    );

    const HowBuckarooWorks = () => (
      <Block>
        {[
          {
            title: 'How Buckaroo Works?',
            content:'The Buckaroo model is very simple. Packages live in source-control, and a manifest file is used to describe dependencies. This points to further manifests to create a dependency graph. Buckaroo works directly over Git and HTTP.',
            image: `${baseUrl}img/how-it-works.png`,
            imageAlign: 'right',
          },
        ]}
      </Block>
    );

    const FeaturesDetailed = () => (
      <div>
      <Block layout="fourColumn" background="dark">
        {[
          {
            title: 'Pull dependencies directly from GitHub, BitBucket, GitLab, hosted Git and HTTP.',
          },
          {
            title: 'Fully reproducible builds and dependency resolution.',
          },
          {
            title: 'Completely decentralized - there is no central server or publishing process.',
          },
          {
            title: 'Allows any build configuration (even on a package-by-package basis).',
          },
        ]}
      </Block>
      <Block layout="fourColumn" background="light">
        {[
          {
            title: 'Private and public dependencies to avoid "dependency hell".',
          },
          {
            title: 'Multiple libraries per package, so tools like Lerna are unnecessary.',
          },
          {
            title: 'Pull individual packages out of mono-repos.',
          },
          {
            title: 'Full support for semantic versioning (but only when you want it!).',
          },
        ]}
      </Block>
      <Block layout="fourColumn" background="dark">
        {[
          {
            title: 'Live at head! Move fast by depending directly on Git branches, but in a controlled way.',
          },
          {
            title: 'Blazing fast resolution using clever heuristics.',
          },
          {
            title: 'Version equivalency checks to reduce dependency conflicts.',
          },
          {
            title: 'TOML configuration files for convenient editing by computers and humans.',
          },
        ]}
      </Block>
      </div>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            title: 'Simple',
            content: 'Packages are installed in one command, with all dependencies defined in single JSON file per-project. All packages use Buck as a build system, yielding faster builds.',
            image: `${baseUrl}img/features/flash.svg`,
            imageAlign: 'top',
          },
          {
            title: 'Secure',
            content: 'The dependency graph is tracked through Git and external resources are hashed to ensure integrity. Your team can easily examine the exact versioning of all build inputs',
            image: `${baseUrl}img/features/secure.svg`,
            imageAlign: 'top',
          },
          {
            title: 'Open-source',
            content: 'Buckaroo is fully open-source and released under a permissive MIT license. You can rest assured that your project is not locked into proprietary technology.',
            image: `${baseUrl}img/features/open-source.svg`,
            imageAlign: 'top',
          },
        ]}
      </Block>
    );
    
    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is using Buckaroo?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <WhyBuckaroo />
          <FeaturesDetailed />
          <HowBuckarooWorks />
          <TryOut />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
