import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";
import { login } from "./auth/login";
import { logout } from "./auth/logout";

const data:HTMLLayoutData = {
  props: {
    authToken: "Valor del token",
    login: () => login(),
    logout: () => logout()
  },
  loaders: {}
}

const routes = constructRoutes(microfrontendLayout, data);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
