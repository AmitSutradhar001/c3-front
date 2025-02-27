import apiService from "../context/apiService";
import { toast } from "react-toastify";
const api = apiService();

//PAdmin

export const getPadmins = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/padmins",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("All project admins are here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const postPadmins = async () => {
  try {
    const res = await api.post(
      "http://50.19.52.232:8000/padmins",
      {
        description: "as",
        profile_pic: "as",
        educations: [
          {
            institute: "as",
            degree: "as",
            description: "as",
            location: "as",
            start_date: "2024-08-02",
            end_date: "2024-09-09",
          },
        ],
        experiences: [
          {
            company_name: "as",
            position: "as",
            description: "as",
            location: "as",
            start_date: "2024-08-02",
            end_date: "2024-08-02",
          },
        ],
        created_at: "2024-08-02T09:03:16.461Z",
        updated_at: "2024-08-02T09:03:16.461Z",
        is_active: true,
        user_id: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Project Admin is created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const getPadminById = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/padmins/1",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Project admins is here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const updatePadminById = async () => {
  try {
    const res = await api.put(
      "http://50.19.52.232:8000/padmins/2",
      {
        description: "na",
        profile_pic: "na",
        educations: [
          {
            institute: "as",
            degree: "as",
            description: "as",
            location: "as",
            start_date: "2024-08-02",
            end_date: "2024-09-09",
          },
        ],
        experiences: [
          {
            company_name: "as",
            position: "as",
            description: "as",
            location: "as",
            start_date: "2024-08-02",
            end_date: "2024-08-02",
          },
        ],
        created_at: "2024-08-02T09:03:16.461Z",
        updated_at: "2024-08-02T09:03:16.461Z",
        is_active: true,
        user_id: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Project Admin is updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const deletePadminById = async () => {
  try {
    const res = await api.delete(
      "http://50.19.52.232:8000/padmins/5",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Project admins is removed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
//---------------------------------------
//Contributor

export const getContributors = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/contributor",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("All project contributors are here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const postContributor = async () => {
  try {
    const res = await api.post(
      "http://50.19.52.232:8000/contributor",
      {
        name: "saaa",
        phone_number: "string",
        role: "string",
        stack: ["string"],
        bio: "string",
        profile_pic: "string",
        experiences: [
          {
            company_name: "string",
            position: "string",
            description: "string",
            location: "string",
            start_date: "2024-08-02",
            end_date: "2024-08-02",
          },
        ],
        educations: [
          {
            institute: "string",
            degree: "string",
            description: "string",
            location: "string",
            start_date: "2024-08-02",
            end_date: "2024-09-09",
          },
        ],
        created_at: "2024-08-02T09:06:09.835Z",
        updated_at: "2024-08-02T09:06:09.835Z",
        user_id: 3,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Contributor is created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const getContributorById = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/contributor/1",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Contributor is here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const updateContributorById = async () => {
  try {
    const res = await api.put(
      "http://50.19.52.232:8000/contributor/1",
      {
        name: "maaam",
        phone_number: "88",
        role: "string",
        stack: ["string"],
        bio: "string",
        profile_pic: "string",
        experiences: [
          {
            company_name: "string",
            position: "string",
            description: "string",
            location: "string",
            start_date: "2024-08-02",
            end_date: "2024-08-02",
          },
        ],
        educations: [
          {
            institute: "string",
            degree: "string",
            description: "string",
            location: "string",
            start_date: "2024-08-02",
            end_date: "2024-08-02",
          },
        ],
        created_at: "2024-08-02T11:00:51.265Z",
        updated_at: "2024-08-02T11:00:51.265Z",
        user_id: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Contributor is updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const deleteContributorById = async () => {
  try {
    const res = await api.delete(
      "http://50.19.52.232:8000/contributor/1",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Contributor is removed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
//--------------------------------------------------------------------------------------
//Applyied

export const appliedGet = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/applied",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("All Applieds are here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const postApplied = async () => {
  try {
    const res = await api.post(
      "http://50.19.52.232:8000/applied",
      {
        contributor_id: 1,
        project_id: 26,
        proposal: "string",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Application is created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const getAppliedById = async () => {
  try {
    const res = await api.get(
      "http://50.19.52.232:8000/applied/1",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Applied is here!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const updateAppliedById = async () => {
  try {
    const res = await api.put(
      "http://50.19.52.232:8000/applied/1",
      {
        contributor_id: 0,
        project_id: 0,
        proposal: "string",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Applied is updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    return toast.error(error.message || "Internal error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
export const deleteAppliedById = async () => {
  try {
    const res = await api.delete(
      "http://50.19.52.232:8000/applied/1",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Application is removed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
//--------------------------------------------------------------------------------------
// Experience
export const getExperience = async () => {
  try {
    const res = await api.get(import.meta.env.VITE_EXPERIENCE_ENDPOINT, {
      headers: {
        "Content-Type": import.meta.env.VITE_EXPERIENCE_HEADERS,
      },
    });
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Get All Experience!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const postExperience = async () => {
  try {
    const res = await api.post(
      import.meta.env.VITE_EXPERIENCE_ENDPOINT + "?contributor_id=" + 1,
      {
        company_name: "string",
        position: "string",
        description: "string",
        location: "string",
        start_date: "2024-08-23",
        end_date: "2024-08-23",
      },
      {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPERIENCE_HEADERS,
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Post Experience!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const getExperienceById = async () => {
  try {
    const res = await api.get(
      import.meta.env.VITE_EXPERIENCE_ENDPOINT + "/" + 1,
      {
        headers: {
          "Content-Type": import.meta.env.VITE_EXPERIENCE_HEADERS,
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Get Experience by Id!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

//---------------------------------------------
// Education
export const getEducation = async () => {
  try {
    const res = await api.get(import.meta.env.VITE_EDUCATION_ENDPOINT, {
      headers: {
        "Content-Type": import.meta.env.VITE_EDUCATION_HEADERS,
      },
    });
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Get All Educations!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const postEducation = async () => {
  try {
    const res = await api.post(
      import.meta.env.VITE_EDUCATION_ENDPOINT + "?contributor_id=" + 1,
      {
        institute: "as",
        degree: "string",
        description: "string",
        location: "string",
        start_date: "2024-08-23",
        end_date: "2024-08-23",
      },
      {
        headers: {
          "Content-Type": import.meta.env.VITE_EDUCATION_HEADERS,
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Post Education!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const getEducationById = async () => {
  try {
    const res = await api.get(
      import.meta.env.VITE_EDUCATION_ENDPOINT + "/" + 1,
      {
        headers: {
          "Content-Type": import.meta.env.VITE_EDUCATION_HEADERS,
        },
      }
    );
    console.log(res);
    console.log(res.data);
    if (res.status === 200) {
      return toast.success("Get Education by Id!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message || "Internal Error!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
