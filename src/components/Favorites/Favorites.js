import React, { Component } from "react";
import { connect } from "react-redux";
import { removeMovieFromFavoriteList, postList } from "../../redux/actions";
import { Link } from "react-router-dom";
// STYLES
import "./Favorites.css";

class Favorites extends Component {
  state = {
    isSubmitted: false,
    title: "",
  };
  favoriteChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };
  getImdbIDArray = () => {
    let favoritesIDArray = this.props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  saveListHandler = () => {
    this.setState({ isSubmitted: true });
    this.props.postList(this.state.title, this.getImdbIDArray());
  };
  render() {
    const { title, isSubmitted } = this.state;
    return (
      <div className="favorites">
        <input
          value={title}
          className="favorites__name"
          disabled={this.state.isSubmitted}
          onChange={this.favoriteChangeHandler}
        />
        <ul className="favorites__list">
          {this.props.favoriteList.map((item) => {
            return (
              <li key={item.imdbID} className="favorites__">
                {item.Title} {item.Year}
                <button
                  onClick={() =>
                    this.props.removeMovieFromFavoriteList(item.imdbID)
                  }
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {!isSubmitted ? (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveListHandler}
            disabled={title===""||this.props.favoriteList.length===0}
          >
            Сохранить список
          </button>
        ) : (
          <button className="favorites__link__btn">
            <Link
              to={`/list/${this.props.listID}`}
              type="button"
              className="favorites__save"
              target="_blank"
            >
              Перейти к выбранным фильмам
            </Link>
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
