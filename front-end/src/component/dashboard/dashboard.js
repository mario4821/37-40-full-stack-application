import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DogForm from './../dogForm/dogForm';
import * as dogAction from '../../action/dogAction';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dogsFetch();
  }

  render() {
    const { 
      dogs, 
      dogCreate, 
      dogUpdate, 
      dogDelete, 
    } = this.props;
    return (
      <div className="dashboard">
        <h2>Dog App</h2>
        <DogForm 
          onComplete={dogCreate}
          buttonText="Create Dog"
        />
        {
          dogs.map((dog) => {
            return (
              <div key={dog._id}>
                <p>Name - {dog.firsName}</p>
                <p>Breed - {dog.breed}</p>
                <p>Age - {dog.age}</p>
                <p>Location - {dog.location}</p>
                <p>Details - {dog.details}</p>
                <DogForm onComplete={dogUpdate} buttonText={'Update'} dog={dog}/>
                <button className="delete" onClick={() => dogDelete(dog)}>Delete</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  dogsFetch: PropTypes.func,
  dogUpdate: PropTypes.func,
  dogCreate: PropTypes.func,
  dogDelete: PropTypes.func,
  dogs: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

const mapDispatchToProps = dispatch => ({
  dogsFetch: () => dispatch(dogAction.dogsFetchRequest()),
  dogUpdate: dog => dispatch(dogAction.dogCreateRequest(dog)),
  dogCreate: dog => dispatch(dogAction.dogCreateRequest(dog)),
  dogDelete: dog => dispatch(dogAction.dogDeleteRequest(dog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
