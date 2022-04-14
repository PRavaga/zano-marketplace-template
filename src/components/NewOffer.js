import React, { useState, useContext } from "react";
import { Store } from "../store/store-reducer";
import { addIdInMyOfferIds, setMessage } from "../store/actions";
import noPhoto from "../assets/images/no_photo.png";
import infoIcon from "../assets/icons/info.svg";
import { useCookies } from "react-cookie";

const createOfferLink = (form) => {
  const {
    title,
    description,
    category,
    price,
    imageUrl,
    contact,
    comment
  } = form;
  const url = 'zano:action=marketplace_offer_create' +
    `&mixins=10` +
    `&hide_sender=true` +
    `&hide_receiver=true'` +
    `&title='${ title }'` +
    `&description='${ description }'` +
    `&category='${ category }'` +
    `&price=${ price }` +
    `&url='${ imageUrl || "" }'` +
    `&contact='${ contact }'` +
    `&comments='${ comment || "" }'`;
  return url;
};

const NewOffer = () => {
  const [title, setTitle] = useState("Offer title");
  const [description, setDescription] = useState("Detailed offer description");
  const [category, setCategory] = useState("Category-Item");
  const [price, setPrice] = useState("10");
  const [imageUrl, setImageUrl] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const { dispatch, state } = useContext(Store);
  const [cookies, setCookie] = useCookies();

  const addIdToCookie = (id) => {
    const ids = cookies?.myOfferIds?.length ? Array.from(new Set([...state.myOfferIds, id])) : [id];
    setCookie('myOfferIds', ids);
    addIdInMyOfferIds(dispatch, id);
  };

  const submit = (e) => {
    e.preventDefault();
    const form = {
      title,
      description,
      category,
      price,
      imageUrl,
      contact,
      comment
    };
    window.location = createOfferLink(form);
    /** TODO от кудова брать новый индетификатор для оффера ? */
    // const id = null;
    // addIdToCookie(id);
    setMessage(dispatch, {
      isLoading: true,
      type: "success",
      text: "Please confirm your submission with Zano wallet",
    });
  };

  return (
    <div className="offer">
      <h1 className="title">New Offer</h1>
      <div className="offer-content">
        <form className="offer-form" onSubmit={ submit }>
          <div className="form__wrap">
            <div className="form__field">
              <label htmlFor="offer-title">Title</label>
              <input
                type="text"
                id="offer-title"
                required
                maxLength={ 30 }
                onChange={ ({ target: { value } }) => setTitle(value) }
              />
              <p className="form-info">
                Maximum length 30 characters
              </p>
            </div>

            <div className="form__field">
              <label htmlFor="offer-category">Category</label>
              <input
                type="text"
                id="offer-category"
                required
                maxLength={ 100 }
                onChange={ ({ target: { value } }) => setCategory(value) }
              />
            </div>

            <div className="form__field">
              <label htmlFor="offer-description">Description</label>
              <textarea
                id="offer-description"
                maxLength={ 500 }
                required
                onChange={ ({ target: { value } }) => setDescription(value) }
              />
            </div>

            <div className="row">
              <div className="col form__field">
                <label htmlFor="offer-price">Price</label>
                <div className="input__with-icon price-field">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="input-icon"
                  >
                    <path
                      d="M9.144 18H3.6C1.6128 18 0 16.3872 0 14.4V8.856C0 6.8724 1.6128 5.256 3.6 5.256H5.292V3.6C5.292 1.6128 6.9048 0 8.892 0H14.4C16.3836 0 18 1.6128 18 3.6V9.108C18 11.0916 16.3872 12.708 14.4 12.708H6.5232C6.0588 12.708 5.6448 12.4308 5.4684 12.0024C5.292 11.574 5.3892 11.0844 5.7168 10.7568L9.0612 7.4124H3.6C2.808 7.4124 2.16 8.0568 2.16 8.8524V14.4C2.16 15.192 2.8044 15.84 3.6 15.84H9.144C9.936 15.84 10.584 15.1956 10.584 14.4V12.708H12.744V14.4C12.744 16.3872 11.1312 18 9.144 18ZM8.9784 10.548H14.4C15.192 10.548 15.84 9.9036 15.84 9.108V3.6C15.84 2.808 15.1956 2.16 14.4 2.16H8.892C8.1 2.16 7.452 2.8044 7.452 3.6V5.256H11.5128C11.9772 5.256 12.3912 5.5332 12.5676 5.9616C12.744 6.39 12.6468 6.8796 12.3192 7.2072L8.9784 10.548Z"
                      fill="#0D0C3A"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <input
                    type="number"
                    id="offer-price"
                    onChange={ ({ target: { value } }) => setPrice(value) }
                    required
                  />
                  <span className="zano-field">ZANO</span>
                </div>
              </div>

              <div className="col form__field">
                <label htmlFor="offer-contact">Contact details</label>
                <div className="input__with-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="input-icon"
                  >
                    <path
                      d="M8.00009 0.5C6.84965 0.499949 5.71462 0.764555 4.68281 1.27335C3.65099 1.78214 2.75006 2.52148 2.0497 3.43417C1.34934 4.34686 0.868328 5.40843 0.643879 6.53676C0.41943 7.66509 0.45756 8.82993 0.755319 9.94117C1.05308 11.0524 1.60248 12.0802 2.36103 12.9452C3.11958 13.8101 4.06694 14.4889 5.12982 14.9292C6.1927 15.3694 7.3426 15.5592 8.49057 15.4839C9.63854 15.4086 10.7538 15.0703 11.7501 14.495C11.8397 14.4481 11.9189 14.3836 11.983 14.3053C12.047 14.227 12.0946 14.1365 12.1227 14.0394C12.1509 13.9423 12.1592 13.8404 12.147 13.74C12.1348 13.6396 12.1024 13.5427 12.0518 13.4551C12.0011 13.3675 11.9333 13.2911 11.8524 13.2304C11.7715 13.1697 11.6791 13.126 11.5809 13.102C11.4826 13.0779 11.3805 13.074 11.2807 13.0904C11.1809 13.1068 11.0854 13.1432 11.0001 13.1975C9.85628 13.8579 8.52655 14.1224 7.2171 13.95C5.90764 13.7777 4.69165 13.1781 3.75768 12.2442C2.82372 11.3104 2.22399 10.0944 2.05148 8.78501C1.87898 7.47557 2.14335 6.14581 2.8036 5.00193C3.46384 3.85806 4.48307 2.96399 5.70321 2.45839C6.92335 1.95279 8.27622 1.86391 9.55202 2.20553C10.8278 2.54715 11.9553 3.30018 12.7595 4.34784C13.5637 5.39551 13.9998 6.67925 14.0001 8V8.5625C14.0001 8.9106 13.8618 9.24444 13.6157 9.49058C13.3695 9.73672 13.0357 9.875 12.6876 9.875C12.3395 9.875 12.0056 9.73672 11.7595 9.49058C11.5134 9.24444 11.3751 8.9106 11.3751 8.5625V5.375C11.3751 5.17609 11.2961 4.98532 11.1554 4.84467C11.0148 4.70402 10.824 4.625 10.6251 4.625C10.4507 4.62112 10.2804 4.67816 10.1435 4.7863C10.0066 4.89445 9.91168 5.04693 9.87509 5.2175C9.32377 4.83618 8.67041 4.62972 8.00009 4.625C7.43546 4.61825 6.87816 4.75327 6.37924 5.0177C5.88032 5.28213 5.45571 5.66751 5.14432 6.13855C4.83292 6.60959 4.64469 7.15124 4.59686 7.71387C4.54902 8.27651 4.64312 8.84215 4.87054 9.359C5.09795 9.87585 5.45141 10.3274 5.89853 10.6722C6.34566 11.0171 6.87217 11.2442 7.42983 11.3329C7.98749 11.4216 8.55849 11.3689 9.09052 11.1797C9.62254 10.9905 10.0986 10.6708 10.4751 10.25C10.8314 10.7115 11.3228 11.0505 11.8807 11.2198C12.4386 11.3891 13.0355 11.3803 13.5882 11.1947C14.1409 11.0091 14.6221 10.6558 14.9647 10.1841C15.3074 9.71234 15.4945 9.14553 15.5001 8.5625V8C15.5001 7.01509 15.3061 6.03982 14.9292 5.12987C14.5523 4.21993 13.9998 3.39314 13.3034 2.6967C12.6069 2.00026 11.7802 1.44781 10.8702 1.0709C9.96027 0.693993 8.985 0.5 8.00009 0.5ZM8.00009 9.875C7.62925 9.875 7.26673 9.76503 6.95839 9.55901C6.65005 9.35298 6.40973 9.06014 6.26781 8.71753C6.1259 8.37492 6.08877 7.99792 6.16111 7.63421C6.23346 7.27049 6.41204 6.9364 6.67426 6.67417C6.93648 6.41195 7.27058 6.23337 7.63429 6.16103C7.99801 6.08868 8.37501 6.12581 8.71762 6.26773C9.06023 6.40964 9.35306 6.64996 9.55909 6.95831C9.76512 7.26665 9.87509 7.62916 9.87509 8C9.87509 8.49728 9.67754 8.97419 9.32591 9.32582C8.97428 9.67746 8.49737 9.875 8.00009 9.875Z"
                      fill="#0D0C3A"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <input
                    id="offer-contact"
                    type="text"
                    required
                    onChange={ ({ target: { value } }) => setContact(value) }
                  />
                </div>
              </div>
            </div>

            <div className="form__field">
              <label htmlFor="offer-img">Image link</label>
              <div className="input__with-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path
                    d="M13.25 0.5H2.75C2.15326 0.5 1.58097 0.737053 1.15901 1.15901C0.737053 1.58097 0.5 2.15326 0.5 2.75V13.25C0.5 13.8467 0.737053 14.419 1.15901 14.841C1.58097 15.2629 2.15326 15.5 2.75 15.5H13.25C13.3734 15.4983 13.4963 15.4857 13.6175 15.4625L13.8425 15.41H13.895H13.9325L14.21 15.305L14.3075 15.2525C14.3825 15.2075 14.465 15.17 14.54 15.1175C14.6401 15.0438 14.7354 14.9636 14.825 14.8775L14.8775 14.81C14.9511 14.7354 15.0188 14.6551 15.08 14.57L15.1475 14.4725C15.1999 14.389 15.245 14.3012 15.2825 14.21C15.3031 14.174 15.3206 14.1364 15.335 14.0975C15.3725 14.0075 15.395 13.91 15.425 13.8125V13.7C15.4675 13.5535 15.4927 13.4024 15.5 13.25V2.75C15.5 2.15326 15.2629 1.58097 14.841 1.15901C14.419 0.737053 13.8467 0.5 13.25 0.5ZM2.75 14C2.55109 14 2.36032 13.921 2.21967 13.7803C2.07902 13.6397 2 13.4489 2 13.25V10.0175L4.4675 7.5425C4.53722 7.4722 4.62017 7.41641 4.71157 7.37833C4.80296 7.34025 4.90099 7.32065 5 7.32065C5.09901 7.32065 5.19704 7.34025 5.28843 7.37833C5.37983 7.41641 5.46278 7.4722 5.5325 7.5425L11.9825 14H2.75ZM14 13.25C13.9993 13.3425 13.9815 13.434 13.9475 13.52C13.9304 13.5566 13.9103 13.5917 13.8875 13.625C13.8674 13.6567 13.8449 13.6868 13.82 13.715L9.8075 9.7025L10.4675 9.0425C10.5372 8.9722 10.6202 8.91641 10.7116 8.87833C10.803 8.84025 10.901 8.82065 11 8.82065C11.099 8.82065 11.197 8.84025 11.2884 8.87833C11.3798 8.91641 11.4628 8.9722 11.5325 9.0425L14 11.5175V13.25ZM14 9.395L12.59 8C12.1608 7.59274 11.5917 7.36571 11 7.36571C10.4083 7.36571 9.83921 7.59274 9.41 8L8.75 8.66L6.59 6.5C6.16079 6.09274 5.59167 5.86571 5 5.86571C4.40833 5.86571 3.83921 6.09274 3.41 6.5L2 7.895V2.75C2 2.55109 2.07902 2.36032 2.21967 2.21967C2.36032 2.07902 2.55109 2 2.75 2H13.25C13.4489 2 13.6397 2.07902 13.7803 2.21967C13.921 2.36032 14 2.55109 14 2.75V9.395Z"
                    fill="#0D0C3A"
                    fillOpacity="0.6"
                  />
                </svg>
                <input
                  type="text"
                  id="offer-img"
                  maxLength={ 2048 }
                  onChange={ ({ target: { value } }) => setImageUrl(value) }
                />
              </div>
            </div>

            <div className="form__field">
              <label htmlFor="offer-comment">Comments</label>
              <div className="input__with-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path
                    d="M8.75 7.25H4.25C4.05109 7.25 3.86032 7.32902 3.71967 7.46967C3.57902 7.61032 3.5 7.80109 3.5 8C3.5 8.19891 3.57902 8.38968 3.71967 8.53033C3.86032 8.67098 4.05109 8.75 4.25 8.75H8.75C8.94891 8.75 9.13968 8.67098 9.28033 8.53033C9.42098 8.38968 9.5 8.19891 9.5 8C9.5 7.80109 9.42098 7.61032 9.28033 7.46967C9.13968 7.32902 8.94891 7.25 8.75 7.25ZM11.75 4.25H4.25C4.05109 4.25 3.86032 4.32902 3.71967 4.46967C3.57902 4.61032 3.5 4.80109 3.5 5C3.5 5.19891 3.57902 5.38968 3.71967 5.53033C3.86032 5.67098 4.05109 5.75 4.25 5.75H11.75C11.9489 5.75 12.1397 5.67098 12.2803 5.53033C12.421 5.38968 12.5 5.19891 12.5 5C12.5 4.80109 12.421 4.61032 12.2803 4.46967C12.1397 4.32902 11.9489 4.25 11.75 4.25ZM13.25 0.5H2.75C2.15326 0.5 1.58097 0.737053 1.15901 1.15901C0.737053 1.58097 0.5 2.15326 0.5 2.75V10.25C0.5 10.8467 0.737053 11.419 1.15901 11.841C1.58097 12.2629 2.15326 12.5 2.75 12.5H11.4425L14.2175 15.2825C14.2876 15.352 14.3707 15.407 14.4621 15.4443C14.5534 15.4817 14.6513 15.5006 14.75 15.5C14.8484 15.5025 14.946 15.482 15.035 15.44C15.172 15.3837 15.2892 15.2882 15.372 15.1654C15.4547 15.0426 15.4993 14.8981 15.5 14.75V2.75C15.5 2.15326 15.2629 1.58097 14.841 1.15901C14.419 0.737053 13.8467 0.5 13.25 0.5ZM14 12.9425L12.2825 11.2175C12.2124 11.148 12.1293 11.093 12.0379 11.0557C11.9466 11.0183 11.8487 10.9994 11.75 11H2.75C2.55109 11 2.36032 10.921 2.21967 10.7803C2.07902 10.6397 2 10.4489 2 10.25V2.75C2 2.55109 2.07902 2.36032 2.21967 2.21967C2.36032 2.07902 2.55109 2 2.75 2H13.25C13.4489 2 13.6397 2.07902 13.7803 2.21967C13.921 2.36032 14 2.55109 14 2.75V12.9425Z"
                    fill="#0D0C3A"
                    fillOpacity="0.6"
                  />
                </svg>
                <input
                  type="text"
                  id="offer-comment"
                  maxLength={ 255 }
                  onChange={ ({ target: { value } }) => setComment(value) }
                />
              </div>

            </div>

            <div className="row">
              <button className="btn-primary" type={ "submit" }><span>Submit Offer</span></button>
              <p className="form-info">
                *You'll be prompted to confirm your submission with Zano wallet
              </p>
            </div>
          </div>
        </form>
        <div className="offer-preview">
          <div className="offer-card">
            { comment && <div className="info">
              <button className="info-button tooltip">
                <img className="info-icon" src={ infoIcon } alt="info"/>
                <div className="menu">
                  <p className="inform-text">{ comment }</p>
                </div>
              </button>
            </div> }
            <div className="content">
              <div className="top-block">
                <img className="img" src={ imageUrl || noPhoto } alt="Marketplace offer pic"/>
                <div className="row">
                  <div className="col">
                    <h3 className="title">{ title }</h3>
                    <p className="categories">{ category }</p>
                  </div>
                  <div className="col">
                    <div className="expiration">
                      <label>Expires in</label>
                      <p>
                        10 days
                      </p>
                    </div>
                  </div>

                </div>

              </div>
              <div className="bottom-block">
                <p className="description">
                  { description }
                </p>
                <div className="row">
                  <div className="col">
                    <div className="price">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9.144 18H3.6C1.6128 18 0 16.3872 0 14.4V8.856C0 6.8724 1.6128 5.256 3.6 5.256H5.292V3.6C5.292 1.6128 6.9048 0 8.892 0H14.4C16.3836 0 18 1.6128 18 3.6V9.108C18 11.0916 16.3872 12.708 14.4 12.708H6.5232C6.0588 12.708 5.6448 12.4308 5.4684 12.0024C5.292 11.574 5.3892 11.0844 5.7168 10.7568L9.0612 7.4124H3.6C2.808 7.4124 2.16 8.0568 2.16 8.8524V14.4C2.16 15.192 2.8044 15.84 3.6 15.84H9.144C9.936 15.84 10.584 15.1956 10.584 14.4V12.708H12.744V14.4C12.744 16.3872 11.1312 18 9.144 18ZM8.9784 10.548H14.4C15.192 10.548 15.84 9.9036 15.84 9.108V3.6C15.84 2.808 15.1956 2.16 14.4 2.16H8.892C8.1 2.16 7.452 2.8044 7.452 3.6V5.256H11.5128C11.9772 5.256 12.3912 5.5332 12.5676 5.9616C12.744 6.39 12.6468 6.8796 12.3192 7.2072L8.9784 10.548Z"
                          fill="#0D0C3A" fillOpacity="0.6"/>
                      </svg>
                      <span>{ price }&nbsp;ZANO</span>
                    </div>
                  </div>
                  <div className="col contact">
                    <span>@{ contact || "username" }</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOffer;
