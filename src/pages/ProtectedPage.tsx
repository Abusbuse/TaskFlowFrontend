import axios from "axios";
import { useEffect } from "react";

const ProtectedPage = () => {
  useEffect(() => {
    axios.get("http://localhost:8000/api/protected", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return <div>Page protégée</div>;
};

export default ProtectedPage;
