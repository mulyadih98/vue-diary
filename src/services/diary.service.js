import axios from 'axios';
import authHeader from './auth.header';
const API_URL = 'https://diary-api-laravel.herokuapp.com/api/';

class DiaryService {
  getAll() {
    return axios.get(API_URL+'diaries',{headers: authHeader()})
      .then(response => {
        return response.data;
      })
  }
  add(diary) {
    return axios.post(API_URL+'diaries',{
        title: diary.title,
        value: diary.value
      },{
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      })
  }
  getById(id) {
    return axios.get(API_URL+'diaries/'+id, {headers: authHeader()})
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      })
  }
  update(id,diary) {
    return axios.put(API_URL+'diaries/'+id,
      {
        title: diary.title,
        value: diary.value
      },
      {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      })
  }
  delete(id){
    return axios.delete(API_URL+'diaries/'+id,{
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      })
  }
}

export default new DiaryService();