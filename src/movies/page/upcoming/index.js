import React,{useState} from 'react';
import {Row,Col,DatePicker} from 'antd';
import MasterLayoutMovie from '../../components/master-layout';
import {api} from '../../services/api';
import ListMovie from '../../components/list-movie';
import {helper} from '../../helpers/common';
import PaginationMovie from '../../components/pagination';
const { RangePicker } = DatePicker;


const UpcomingMovie = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [comingMovies, setComingMovies] = useState({});
    const [totalPage, setTotalPage]  = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [fDate, setFromDate] = useState('');
    const [tDate, setToDate] = useState('');
    const chooseTime = async(t1, t2, p=1) =>{
        setLoading(true);
        setPage(p);
        //console.log('datetime',t1,t2);
        let fromDate = t2[0];
        let toDate = t2[1];
        let data = await api.getDataComingMovie(fromDate, toDate, page);
        if(data.hasOwnProperty('results')){
            setFromDate(fromDate);
            setToDate(toDate)
            setComingMovies(data.results);
            setTotalPage(data.total_pages);
            setTotalItem(data.total_results);
        }
        //console.log('dataupcoming',data.results,'data',data.total_pages);
        setLoading(false);
    }
    return(
        <MasterLayoutMovie>
            <Row>
                <Col span={24}>
                    <RangePicker 
                        onChange={(d1,d2)=>chooseTime(d1,d2)}
                    />
                </Col>
            </Row>
            {!loading 
                && !helper.isEmptyObject(comingMovies)
                &&
                <ListMovie
                    loading={loading}
                    movies={comingMovies}
                ></ListMovie>
            }
            {!loading 
                && !helper.isEmptyObject(comingMovies)
                &&
                <PaginationMovie
                    current={page}
                    total={totalItem}
                    totalPage={totalPage}
                    fDate={fDate}
                    tDate={tDate}
                    change={chooseTime}
                ></PaginationMovie>
            }
            
        </MasterLayoutMovie>
    )
}
export default React.memo(UpcomingMovie);