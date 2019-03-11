import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { sortAmountDesc, sortAmountAsc } from "react-icons-kit/icomoon/";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderSorterBtn(arr) {
    return arr.map((el, index) => {
      return (
        <div key={index} onClick={el.onClick} className=" font-ar sorter">
          {el.assinding ? (
            <Icon icon={sortAmountAsc} />
          ) : (
            <Icon icon={sortAmountDesc} />
          )}
          {el.title}
        </div>
      );
    });
  }
  render() {
    const { title, children, noHeader, sorter } = this.props;
    return (
      <div
        onClick={this.props.onClick}
        className={"card-type-2 " + this.props.className}
      >
        {!noHeader && (
          <div className="card-header has-right-btn">
            <h4>{title}</h4>
            <div className="cart-right-btns">
              {sorter && this.renderSorterBtn(sorter)}
            </div>
          </div>
        )}
        <div className="card-body-wrapper">
          <div className="card-body">{children}</div>
        </div>
      </div>
    );
  }
}

export { Card };
