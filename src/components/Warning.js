import React, { Component } from 'react';
import styles from '@/styles/Warning.module.css';

class Warning extends Component {
  render() {
    return (
      <div className={styles.Warning}>
        {/* CATAGORY */}
        {this.props.catagory === 'Park Closure' ? (
          <p className={styles.Warning_catagory_closure}>
            {this.props.catagory}
          </p>
        ) : this.props.catagory === 'Information' ? (
          <p className={styles.Warning_catagory_information}>
            {this.props.catagory}
          </p>
        ) : this.props.catagory === 'Caution' ? (
          <p className={styles.Warning_catagory_caution}>
            {this.props.catagory}
          </p>
        ) : this.props.catagory === 'Danger' ? (
          <p className={styles.Warning_catagory_danger}>
            {this.props.catagory}
          </p>
        ) : (
          <p className={styles.Warning_catagory}>{this.props.catagory}</p>
        )}
        {/* TITLE */}
        {this.props.url === '' ? (
          <h5 className={styles.Warning_title}>{this.props.title}</h5>
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
