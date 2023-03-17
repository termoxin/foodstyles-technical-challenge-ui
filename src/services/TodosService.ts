import axios from "axios";
import { TOKEN } from "../utils/constants";
import { getCookie } from "../utils/cookie-handler";

const BASE_URL = "http://localhost:8080";
const LOAD_TODOS = "/todos";
const SINGLE_TODO = "/todo";

const loadAll = () => {
  return axios
    .get(`${BASE_URL}${LOAD_TODOS}`, {
      headers: {
        "x-access-token": getCookie(TOKEN),
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const save = (title: string) => {
  return axios
    .post(
      `${BASE_URL}${SINGLE_TODO}`,
      {
        title,
      },
      {
        headers: {
          "x-access-token": getCookie(TOKEN),
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const update = (todoId: string) => {
  return axios
    .post(
      `${BASE_URL}${SINGLE_TODO}/${todoId}`,
      {},
      {
        headers: {
          "x-access-token": getCookie(TOKEN),
        },
      }
    )
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const remove = (todoId: string) => {
  return axios.delete(`${BASE_URL}${SINGLE_TODO}/${todoId}`, {
    headers: {
      "x-access-token": getCookie(TOKEN),
    },
  });
};

const TodosService = {
  loadAll,
  save,
  update,
  remove,
};

export default TodosService;
