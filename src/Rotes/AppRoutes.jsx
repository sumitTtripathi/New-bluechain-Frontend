import { Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router";
import CustomLoader from "../Components/CustomLoader/CustomLoader";
import { ROUTES } from "../Constants/Routes";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import BotLandingPage from "../Screens/BotLandingPage/BotLandingPage";
import SwapStrategy from "../Screens/SwapStrategy/SwapStrategy";
const SpotStrategy = lazy(() => import("../Screens/SpotStrategy/SpotStrategy"));
const OrderDetail = lazy(() =>
  import("../Components/Bots/OrderDetail/OrderDetail")
);
const Perpetual = lazy(() => import("../Screens/Perpetual/Perpetual"));
const Asset = lazy(() => import("../Screens/AssetSpot/Asset/Asset"));
const AssetSpot = lazy(() => import("../Screens/AssetSpot/AssetSpot"));
const AssetDeposit = lazy(() =>
  import("../Screens/AssetSpot/AssetDeposit/AssetDeposit")
);
const Withdraw = lazy(() => import("../Screens/AssetSpot/Withdraw/Withdraw"));
const Deposit = lazy(() => import("../Screens/AssetSpot/Deposit/Deposit"));
const AssetWithdraw = lazy(() =>
  import("../Screens/AssetSpot/AssetWithdraw/AssetWithdraw")
);

const SpotOrders = lazy(() => import("../Screens/Spot/SpotOrders/SpotOrders"));

const Settings = lazy(() => import("../Screens/Settings/Settings"));
const AccountSettings = lazy(() =>
  import("../Screens/Settings/AccountSettings/AccountSettings")
);

const FreezeAccount = lazy(() =>
  import("../Screens/Settings/AccountSettings/FreezeAccount/FreezeAccount")
);
const PreferenceSettings = lazy(() =>
  import("../Screens/Settings/PreferencesSettings/PreferencesSettings")
);
const DeleteAccount = lazy(() =>
  import("../Screens/Settings/AccountSettings/DeleteAccount/DeleteAccount")
);
const Spot = lazy(() => import("../Screens/Spot/Spot"));
const Market = lazy(() => import("../Screens/Market/Market"));
const MarketOverview = lazy(() =>
  import("../Screens/MarketOverview/MarketOverview")
);

const MarketMain = lazy(() => import("../Screens/Market/Main/Main"));
const LandingPage = lazy(() => import("../Screens/LandingPage/LandingPage"));
const Signup = lazy(() => import("../Screens/Signup/Signup"));
const Login = lazy(() => import("../Screens/Login/Login"));
const ResetPassword = lazy(() =>
  import("../Screens/ResetPassword/ResetPassword")
);
const ForgotPassword = lazy(() =>
  import("../Screens/ForgotPassword/ForgotPassword")
);
const CoinDetails = lazy(() => import("../Screens/CoinDetails/CoinDetails"));
export const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<CustomLoader tip={"Loading..."} />}>
      <Routes>
        <Route element={<LandingPage />} path={ROUTES.HOME} />
        <Route element={<BotLandingPage />} path={ROUTES.BOT_LANDING} />
        <Route path={`${ROUTES.STRATEGY}`}>
          <Route path=":id" element={<SpotStrategy />} />
        </Route>
        <Route path={`${ROUTES.PERPETUAL}/:id`} element={<Perpetual />} />
        <Route
          path={`${ROUTES.SWAP_STRATEGY}/:id`}
          element={<SwapStrategy />}
        />

        <Route path={`${ROUTES.SPOT}`}>
          <Route index element={<Spot />} />
          <Route path=":id" element={<Spot />} />
          <Route element={<PrivateRoute />}>
            <Route
              path={ROUTES.CURRENTSPOT.replace("/spot/", "")}
              element={<SpotOrders />}
            />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path={ROUTES.LOGIN} />
          <Route element={<Signup />} path={ROUTES.SIGNUP} />
          <Route element={<ForgotPassword />} path={ROUTES.FORGOTPASSWORD} />
        </Route>
        <Route element={<CoinDetails />} path={ROUTES.COINDETAILS} />
        <Route element={<PrivateRoute />}>
          <Route
            element={<OrderDetail />}
            path={`${ROUTES.ORDER_DETAIL}/:id`}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AssetSpot />} path={`${ROUTES.ASSET}`}>
            <Route index element={<Asset navigate={navigate} />} />
            <Route path="deposit-records" element={<AssetDeposit />} />
            <Route path="withdraw-records" element={<AssetWithdraw />} />
            <Route path={"deposit"} element={<Deposit />} />
            <Route path={"deposit/:id"} element={<Deposit />} />
            <Route path="withdraw/:id" element={<Withdraw />} />
            <Route path="withdraw" element={<Withdraw />} />
          </Route>
          <Route element={<ResetPassword />} path={ROUTES.RESETPASSWORD} />
          <Route element={<Settings />} path={ROUTES.SETTINGS}>
            <Route
              path={ROUTES.PREFERENCESETTINGS}
              element={<PreferenceSettings />}
            />
            <Route
              path={ROUTES.ACCOUNTSETTINGS}
              element={<AccountSettings />}
            />
            <Route path={ROUTES.FORBID} element={<FreezeAccount />} />
            <Route path={ROUTES.CANCEL} element={<DeleteAccount />} />
          </Route>
        </Route>
        <Route element={<Market />} path={ROUTES.MARKET}>
          <Route index element={<MarketMain />} />
          <Route path="data" element={<MarketOverview />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
