import React, { Component } from "react";
import "./MovieItem.css";
import { connect } from "react-redux";
import { addFavoriteList } from "../../redux/actions";

class MovieItem extends Component {
  checkId = (imdbID) => {
    const active = this.props.favoriteList.find((item) => {
      return item.imdbID === imdbID;
    });
    if (active) {
      return true;
    }
  };
  render() {
    const { Title, Year, Poster, imdbID } = this.props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            type="button"
            className="movie-item__add-button"
            onClick={() => this.props.addFavoriteList(imdbID)}
            disabled={this.checkId(imdbID)}
          >
            {this.checkId(imdbID) ? "Добавлено" : "Добавить в список"}
          </button>
        </div>
      </article>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteList: (imdbID) => {
      dispatch(addFavoriteList(imdbID));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
