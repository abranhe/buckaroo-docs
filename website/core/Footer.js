const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('installation', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('commands', this.props.language)}>
              Usage
            </a>
            <a href={this.docUrl('quickstart', this.props.language)}>
              Quickstart
            </a>
            <a href={this.docUrl('faq', this.props.language)}>
              FAQ
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href="https://github.com/loopperfect/buckaroo">Fork us on GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/looperfect/buckaroo/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
          <div>
            <h5>Builds</h5>
            <a
              href="https://travis-ci.org/LoopPerfect/buckaroo"
              target="_blank"
              rel="noreferrer noopener">
            <img
              src="https://img.shields.io/travis/LoopPerfect/buckaroo/buckaroo-redux.svg?logo=travis"
              alt="Travis Build"
            />
            </a>
            <a
              href="https://ci.appveyor.com/project/njlr/buckaroo"
              target="_blank"
              rel="noreferrer noopener">
              <img
              src="https://img.shields.io/appveyor/ci/njlr/buckaroo/buckaroo-redux.svg?logo=appveyor"
              alt="AppVeyor Build"
              />
            </a>
          </div>
        </section>

        <a
          href="http://www.loopperfect.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={`${this.props.config.baseUrl}img/poweredbyLoopPerfect.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
