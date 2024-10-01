import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Text Mood Processor" description="Analyze and change the tone of your text">
      <main className="container">
        <div className={styles.hero}>
          <h1 className="hero__title">Text Mood Processor</h1>
          <p className="hero__subtitle">
            This tool helps you analyze and change the tone of any text, allowing you to adjust the mood to fit your needs.
          </p>

          {/* Demo section */}
          <div className={styles.demo}>
            <h2>Demo</h2>
            <iframe 
              src="https://www.text-mood-processor.live/" 
              title="Text Mood Processor Demo" 
              width="100%" 
              height="500px" 
              style={{ border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          {/* Brief explanation of the app */}
          <div className={styles.explanation}>
            <h2>What does Text Mood Processor do?</h2>
            <p>
              Text Mood Processor is an app that allows users to analyze the tone of any text to determine the predominant emotions. 
              Additionally, it provides the ability to modify the tone of the text, adapting it to the style you need—whether friendly, serious, or funny.
            </p>
          </div>

          {/* Link to the Docs */}
          <div className={styles.docsLink}>
            <Link className="button button--primary button--lg" to="/app">
              Explore the Docs
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

