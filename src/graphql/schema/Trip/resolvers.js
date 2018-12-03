import { users, voters, creator, chosenSuggestion } from '../resolver-helpers';
import { PubSub, withFilter } from 'apollo-server';
import {
  createTrip,
  addParticipants,
  addOrVoteForDestination,
  addOrVoteForTimeFrame,
  addOrVoteForBudget,
  removeVoteForDestination,
  removeVoteForTimeFrame,
  removeVoteForBudget,
  lockDestination
} from '../../../controllers/trip.controller';
const pubsub = new PubSub();

export default {
  Subscription: {
    tripInfoChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('TRIPINFO_CHANGED'),
        async (payload, _, { User, user: { email } }) => {
          const user = await User.findOne({ email });
          const payloadResolved = await payload.tripInfoChanged;
          const participants = payloadResolved.participants.map((participant) => participant.toString());
          return participants.includes(user._id.toString());
        }
      )
    }
  },

  Query: {
    trip: (_, { id }, { Trip }) => Trip.findOne({ _id: id }),
    allTrips: (_, __, { Trip }) => Trip.find()
  },

  Mutation: {
    createTrip: async (_, { trip }, { Trip, User, user }) => {
      const newTrip = createTrip(trip, user, { Trip, User });
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    addParticipants: async (_, { tripID, participants }, ctx) => {
      const newTrip = addParticipants(tripID, participants, ctx);
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    addOrVoteForDestination: async (_, { tripID, destinations }, { Trip, user }) => {
      const newTrip = addOrVoteForDestination(tripID, destinations, user, { Trip });
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    addOrVoteForBudget: async (_, { tripID, budget }, { Trip, user }) => {
      const newTrip = addOrVoteForBudget(tripID, budget, user, { Trip });
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    addOrVoteForTimeFrame: async (_, { tripID, timeFrames }, { Trip, user }) => {
      const newTrip = addOrVoteForTimeFrame(tripID, timeFrames, user, { Trip });
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    removeVoteForDestination: async (_, { tripID, suggestionID }, { Trip, user }) => {
      const newTrip = removeVoteForDestination(tripID, suggestionID, user, Trip);
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    removeVoteForTimeFrame: async (_, { tripID, suggestionID }, { Trip, user }) => {
      const newTrip = removeVoteForTimeFrame(tripID, suggestionID, user, Trip);
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    removeVoteForBudget: async (_, { tripID, suggestionID }, { Trip, user }) => {
      const newTrip = removeVoteForBudget(tripID, suggestionID, user, Trip);
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    },
    lockDestination: async (_, { tripID, suggestionID }, { Trip, user }) => {
      const newTrip = lockDestination(tripID, suggestionID, user, Trip);
      pubsub.publish('TRIPINFO_CHANGED', { tripInfoChanged: newTrip });
      return newTrip;
    }
  },

  Trip: {
    participants: ({ participants }, _, { User }) => users(participants, User),
    creator
  },
  DestinationObject: {
    chosenSuggestion
  },
  Destination: {
    voters,
    creator
  },
  BudgetObject: {
    chosenSuggestion
  },
  Budget: {
    voters,
    creator
  },
  TimeFrameObject: {
    chosenSuggestion
  },
  TimeFrame: {
    voters,
    creator
  }
};
