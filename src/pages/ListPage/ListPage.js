import React, { Component } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList } from "../../redux/actions";

class ListPage extends Component {
  state = {
    Clicked: false,
  };
  componentDidMount() {
    const id = this.props.match.params;
    this.props.getList(id.id);
  }
  render() {
    return (
      <div className="list-page">
        <h1 className="list-page__title">Мой список</h1>
        <ul className="container">
          {this.props.movieDetails.map((item) => {
            return (
              <li key={item.imdbID} className="listitem">
                <div className="box">
                  <img src={item.Poster} alt={item.Title} />
                  <div className="info">
                    <h1 className="title">{item.Title}</h1>
                    <ul className="add">
                      <li>Year : {item.Year}</li>
                      <li>Runtime : {item.Runtime}</li>
                      <li>Genre : {item.Genre}</li>
                    </ul>
                    <p className="plot">{item.Plot}</p>
                  <div className="position">
                  <div className="imdb"><span>IMDB : </span>{item.imdbRating}</div>
                    <div className="director">{item.Director}</div>
                    <button>
                    <a href={`https://www.imdb.com/title/${item.imdbID}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      смотрите больше на imdb
                    </a>
                  </button>
                  </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getList: (id) => dispatch(getList(id)),
});

const mapStateToProps = (state) => {
  return {
    title: state.title,
    movieDetails: state.movieDetails,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);

