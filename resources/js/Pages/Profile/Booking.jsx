import axios from 'axios'
import React, { useContext, useEffect , useState} from 'react'
import '../../../css/ReportStyle/Booking.css'
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/User';
import Loading from '../../Componants/UI/Loading';
import { TranslateContext } from './../../Context/Translate';

function Booking() {
  const {translates}=useContext(TranslateContext)
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discountVal,setDiscountVal]=useState(0);
  const navigate = useNavigate();
  const checkDicount=()=>{
    if(user.points==5 || user.points==10||user.points==15){
     setDiscountVal(0.05);
    }else if(user.points==20 || user.points==25||user.points==30){
     setDiscountVal(0.1);
    }else if(user.points==35 || user.points==40||user.points==45){
     setDiscountVal(0.1);
    }else if (user.points==50|| user.points >50 ){
     setDiscountVal(0.2);

    }
   }
  const bookingResult = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      let response;
      if (user.role === 'Renter') {
        response = await axios.get(`allBillsOfRenter`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        response = await axios.get(`showAllBillsOfMyCompany`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bookingResult();
    checkDicount();
  }, [user.role]);

  const handleBooking = async (e) => {
    const id = e.currentTarget.id;
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`/showBill/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const resultBill = response.data.data;
      navigate('/report', { state: { resultBill } });
    } catch (error) {
      console.error("Error fetching bill:", error);
    }
  }

  const bookingByMonth = {};
  bookings.forEach((item) => {
    const endDate = new Date(item.end_date);
    const monthYearKey = `${endDate.getMonth() + 1}-${endDate.getFullYear()}`;
    if (!bookingByMonth[monthYearKey]) {
      bookingByMonth[monthYearKey] = [];
    }

    bookingByMonth[monthYearKey].push(item);
  });

  return (
    loading ? (
      <div className="d-flex justify-center align-middle">
        <Loading />
      </div>
    ) : (
      <div className='d-flex flex-column align-items-center mainBooking'>
        {user.role === "Renter" ? <h3 className='fw-bold fs-4 py-3'>{translates.MyBooking}</h3> : <h3 className='fw-bold fs-4 py-3'>{translates.BookingCompany}</h3>}
        {bookings.length > 0 ? Object.entries(bookingByMonth).map(([monthYearKey, bookings]) => (
          <div key={monthYearKey}>
            <h3 className='fs-5'>{translates.In} <span className='fw-bold'>{monthYearKey}</span></h3>
            {bookings.map((item, index) => (
              <div key={item.id} id={item.id} className='minorBooking d-flex flex-wrap border py-2 px-4 m-3 d-flex align-items-center justify-content-between gap-5 w-100' onClick={handleBooking}>
                <span>{translates.booking} <span className='text-primary fw-bold'>#{index + 1}</span></span>
                {user.role === 'Renter' ? (
                  <p>
                    <span className="text-primary fw-bold">{translates.From}: </span>
                    {item.car.owner ? item.car.owner.name : 'Unknown Owner'} Company
                  </p>
                ) : (
                  <p>
                    <span className="text-primary fw-bold">{translates.From}: </span>
                    {item.user_id.name ? item.user_id.name : 'Unknown Owner'}
                  </p>
                )}
                <span>
                  <span className="text-primary fw-bold">{translates.TotalPrice}: </span>
                  {user.points>0  ?(Math.ceil(item.amount) - Math.ceil(Math.ceil(item.amount) *  discountVal)): Math.ceil(item.amount) } ₪                </span>
              </div>
            ))}
          </div>
        )) : user.role === "Renter" ? <div className='py-3'>{translates.notBook}</div> : <div className='py-3'>{translates.carsBooking}</div>}
      </div>
    )
  );
}

export default Booking;
