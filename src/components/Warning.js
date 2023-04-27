import React, { Component } from 'react';
import styles from '@/styles/Warning.module.css';

class Warning extends Component {
  render() {
    console.log(this.props.catagory);
    return (
      <div className={styles.Warning}>
        {/* CATAGORY */}
        {this.props.catagory === 'Park Closure' ? (
          <h2 className={styles.Warning_catagory_closure}>
            {this.props.catagory}
          </h2>
        ) : this.props.catagory === 'Information' ? (
          <h2 className={styles.Warning_catagory_information}>
            {this.props.catagory}
          </h2>
        ) : this.props.catagory === 'Caution' ? (
          <h2 className={styles.Warning_catagory_caution}>
            {this.props.catagory}
          </h2>
        ) : this.props.catagory === 'Danger' ? (
          <h2 className={styles.Warning_catagory_danger}>
            {this.props.catagory}
          </h2>
        ) : (
          <h2 className={styles.Warning_catagory}>{this.props.catagory}</h2>
        )}
        {/* TITLE */}
        {this.props.url === '' ? (
          <p className={styles.Warning_title}>{this.props.title}</p>
        ) : (
          <a
            target='_blank'
            href={this.props.url}
            className={styles.Warning_title}
          >
            {this.props.title}
          </a>
        )}
        {/* DESCRIPTION */}
        <p className={styles.Warning_description}>{this.props.description}</p>
      </div>
    );
  }
}

export default Warning;
