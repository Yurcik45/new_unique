import "./SettingsPagesForm.sass";
import TopMenu from "../../components/TopMenu/TopMenu";
import { Route, Redirect } from "react-router-dom";
import Profile from "./Profile/Profile";
import Plans from "./Plans/Plans";
import Email from "./Email/Email";
import Settings from "./Settings/Settings";

const SettingsPagesForm = () => {
  const barMenuArray = [
    {
      name: "Profile",
      link: "/settings/profile",
    },
    {
      name: "Plans",
      link: "/settings/plans",
    },
    {
      name: "Email warning",
      link: "/settings/email",
    },
    {
      name: "Settings",
      link: "/settings/settings",
    },
  ];

  return (
    <div className="SettingsGeneralPageContainer">
        <TopMenu barMenuArray={barMenuArray} />

        <Redirect to="/settings/plans"/>

        <Route path="/settings/profile">
          <Profile />
        </Route>
        <Route path="/settings/plans">
          <Plans />
        </Route>
        <Route path="/settings/email">
          <Email />
        </Route>
        <Route path="/settings/settings">
          <Settings />
        </Route>
    </div>
  );
};

export default SettingsPagesForm;
