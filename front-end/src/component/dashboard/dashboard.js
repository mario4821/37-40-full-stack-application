import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DogForm from '../dog-form/dog-form';
import PictureForm from '../picture-form/picture-form';
import * as dogAction from '../../action/dogAction';
import * as pictureAction from '../../action/pictureAction';

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
        <h2>Add a Dog To The Site!</h2>
        <DogForm 
          onComplete={dogCreate}
          buttonText={'Create'}
        />
        <div className="body">
        <h2>Dog Availability</h2>
        {
          dogs.map((dog) => {
            return (
              <div key={dog._id}>
                <p>{dog.firstName}</p>
                <p>{dog.breed}</p>
                <p>{dog.age}</p>
                <p>{dog.location}</p>
                <p>{dog.details}</p>
                <PictureForm onComplete={this.props.pictureUpload}/>
                <DogForm onComplete={dogUpdate} buttonText={'Update'} dog={dog}/>
                <button className="delete" onClick={() => dogDelete(dog)}>Delete Dog</button>
              </div>
            );
          })
        }
      </div>
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
  pictureUpload: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dog,
  };
};

const mapDispatchToProps = dispatch => ({
  dogsFetch: () => dispatch(dogAction.dogsFetchRequest()),
  dogCreate: dog => dispatch(dogAction.dogCreateRequest(dog)),
  dogUpdate: dog => dispatch(dogAction.dogUpdateRequest(dog)),
  dogDelete: dog => dispatch(dogAction.dogDeleteRequest(dog)),
  pictureUpload: file => dispatch(pictureAction.createRequestPicture(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
