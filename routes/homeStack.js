import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/home";
import Continents from "../screens/continents";
import Countries from "../screens/countries";
import CountryDetails from "../screens/countryDetails";
import QuizGameType from "../screens/quizGameType";
import QuizGameRegion from "../screens/quizGameRegion";
import QuizGameQuestions from "../screens/quizGameQuestions";
import QuizGame from "../screens/quizGame";
import QuizGameNeighbours from "../screens/quizGameNeighbours";
import QuizGameFlags from "../screens/quizGameFlags";
import QuizResults from "../screens/quizResults";
import StatisticsList from "../screens/statisticsList";
import StatisticsListDetailed from "../screens/statisticsListDetailed";


import Header from "../shared/header";
import React from "react";


const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: () => <Header title="Quiz App" />,
    },
  },
  Continents: {
    screen: Continents,

    navigationOptions: {
      headerTitle: () => <Header title="Continents" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
  Countries: {
    screen: Countries,

    navigationOptions: {
      headerTitle: () => <Header title="Countries" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
  CountryDetails: {
    screen: CountryDetails,

    navigationOptions: {
      headerTitle: () => <Header title="Country Details" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },

  QuizGameType: {
    screen: QuizGameType,
    navigationOptions: {
      headerTitle: () => <Header title="Game Type" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },

  QuizGameRegion: {
    screen: QuizGameRegion,
    navigationOptions: {
      headerTitle: () => <Header title="Game Region" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
  QuizGameQuestions: {
    screen: QuizGameQuestions,
    navigationOptions: {
      headerTitle: () => <Header title="Game Questions" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
  QuizGame: {
    screen: QuizGame,
    navigationOptions: { headerShown: false },
  },
  QuizGameNeighbours: {
    screen: QuizGameNeighbours,
    navigationOptions: { headerShown: false },
  },
  QuizGameFlags: {
    screen: QuizGameFlags,
    navigationOptions: { headerShown: false },
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: { headerShown: false },
  },
  StatisticsList: {
    screen: StatisticsList,
    navigationOptions: {
      headerTitle: () => <Header title="Statistics" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
  StatisticsListDetailed: {
    screen: StatisticsListDetailed,
    navigationOptions: {
      headerTitle: () => <Header title="Details" />,
      headerTitleContainerStyle: {
        left: 0,
      },
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#252C4A", height: 60 },
  },
});

export default createAppContainer(HomeStack);
