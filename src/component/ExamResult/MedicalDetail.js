import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColor } from '@theme';
import { scaledSize } from '@utils';
import { useSelector } from 'react-redux';

const MedicalDetail = ({ mediaclCateCode,medicalInfo }) => {
    let medicalIndexRedux =  useSelector((state) => state.appointment.medicalIndex);
  const [medicalIndex,setMedicalIndex] = React.useState(null)

  React.useEffect(() =>{
    if(medicalIndexRedux){
        setMedicalIndex(medicalIndexRedux)
    }
    if(medicalInfo){
      setMedicalIndex(medicalInfo)
    }
  },[medicalIndexRedux])

    const renderItems = (title,content) =>{
        return(
            <View style={styles.itemsStyle}>
            <Text style={{fontWeight:'500'}}>{title}</Text>
            <Text style={{marginLeft:16}}>{content}</Text>
          </View>
        )
    }
  const renderTips = () => {
    return (
      <View style={styles.container}>
        {renderItems("Khám lâm sàng: ",medicalIndex.clinicalExamination)}
        {renderItems("Điều trị: ",medicalIndex.treatment)}
        {renderItems("Phương pháp hỗ trợ: ",medicalIndex.supportMethod)}
        {renderItems("Hẹn khám lại: ",medicalIndex.examAgain)}
      </View>
    );
  };

  const renderReproductiveSupport = () => {
    return (
        <View style={styles.container}>
          {renderItems("Đẻ thường: ",medicalIndex.normalBorn)}
          {renderItems("Đẻ mổ: ",medicalIndex.caesarean)}
          {renderItems("Tiền sử kinh nguyệt: ",medicalIndex.isEvenlyMenstrualHistory ? "Đều" : "Không đều")}
          {renderItems("Chu kỳ kinh nguyệt: ",medicalIndex.cycle)}
          {renderItems("Thời gian hành kinh: ",medicalIndex.duringTime)}
          {renderItems("Kinh nguyệt hiện tại: ",medicalIndex.currentMenstrual)}
          {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
          {renderItems("Âm hộ, tầng sinh môn: ",medicalIndex.vulvaAndPerineal)}
          {renderItems("Tử cung: ",medicalIndex.cervical)}
          {renderItems("Tử cung - phần phụ: ",medicalIndex.uterusExtra)}
          {renderItems("Dấu hiệu khác: ",medicalIndex.otherSignal)}
          {renderItems("Điều trị: ",medicalIndex.treatment)}
          {renderItems("Phương pháp hỗ trợ: ",medicalIndex.supportMethod)}
          {renderItems("Hẹn khám lại: ",medicalIndex.examAgain)}
      </View>
    );
  };
  const renderLatePeriod = () => {
    return (
        <View style={styles.container}>
        {renderItems("Đẻ thường: ",medicalIndex.normalBorn)}
        {renderItems("Đẻ mổ: ",medicalIndex.caesarean)}
        {renderItems("Tiền sử kinh nguyệt: ",medicalIndex.isEvenlyMenstrualHistory ? "Đều" : "Không đều")}
        {renderItems("Chu kỳ kinh nguyệt: ",medicalIndex.cycle)}
        {renderItems("Thời gian hành kinh: ",medicalIndex.duringTime)}
        {renderItems("Kinh nguyệt hiện tại: ",medicalIndex.currentMenstrual)}
        {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
        {renderItems("Âm hộ, tầng sinh môn: ",medicalIndex.vulvaAndPerineal)}
        {renderItems("Tử cung: ",medicalIndex.cervical)}
        {renderItems("Tử cung - phần phụ: ",medicalIndex.uterusExtra)}
        {renderItems("Dấu hiệu khác: ",medicalIndex.otherSignal)}
        {renderItems("Điều trị: ",medicalIndex.treatment)}
        {renderItems("Phương pháp hỗ trợ: ",medicalIndex.supportMethod)}
        {renderItems("Hẹn khám lại: ",medicalIndex.examAgain)}
    </View>
    );
  };
  const renderInfertility = () => {
    return (
        <View style={styles.container}>
          {renderItems("Đẻ thường: ",medicalIndex.normalBorn)}
          {renderItems("Đẻ mổ: ",medicalIndex.caesarean)}
          {renderItems("Tiền sử kinh nguyệt: ",medicalIndex.isEvenlyMenstrualHistory ? "Đều" : "Không đều")}
          {renderItems("Chu kỳ kinh nguyệt: ",medicalIndex.cycle)}
          {renderItems("Thời gian hành kinh: ",medicalIndex.duringTime)}
          {renderItems("Kinh nguyệt hiện tại: ",medicalIndex.currentMenstrual)}
          {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
          {renderItems("Âm hộ, tầng sinh môn: ",medicalIndex.vulvaAndPerineal)}
          {renderItems("Tử cung: ",medicalIndex.cervical)}
          {renderItems("Tử cung - phần phụ: ",medicalIndex.uterusExtra)}
          {renderItems("Dấu hiệu khác: ",medicalIndex.otherSignal)}
          {renderItems("Điều trị: ",medicalIndex.treatment)}
          {renderItems("Phương pháp hỗ trợ: ",medicalIndex.supportMethod)}
          {renderItems("Hẹn khám lại: ",medicalIndex.examAgain)}
      </View>
    );
  };
  const renderPrelabor = () => {
    return (
        <View style={styles.container}>
        {renderItems("Khám thai lần: ",medicalIndex.examTimes)}
        {renderItems("Chiều cao: ",medicalIndex.height)}
        {renderItems("Cân nặng: ",medicalIndex.weight)}
        {renderItems("Tình trạng phù nề: ",medicalIndex.edemaStatus)}
        {renderItems("Mạch đập: ",medicalIndex.pulse)}
        {renderItems("Huyết áp: ",medicalIndex.bloodPressure)}
        {renderItems("Cao tử cung: ",medicalIndex.uterus)}
        {renderItems("Vòng bụng: ",medicalIndex.waistCircumference)}
        {renderItems("Cơn co tử cung: ",medicalIndex.uterineContractions ? "Có" : "Không")}
        {renderItems("Tình trạng tử cung: ",medicalIndex.isCervicalShort ? "Dài" : "Ngắn")}
        {renderItems("Tình trạng tử cung: ",medicalIndex.isCervicalOpen ? "Mở" : "Đóng kín")}
        {renderItems("Dấu hiệu khác: ",medicalIndex.otherSignal)}
        {renderItems("Tư vấn chăm sóc: ",medicalIndex.careAdvice)}
        {renderItems("Điều trị (nếu có): ",medicalIndex.treatment)}
    </View>
    );
  };
  const renderInternal = () => {
    return (
        <View style={styles.container}>
        {renderItems("Tiền sử: ",medicalIndex.prehistoric)}
        {renderItems("Bệnh sử: ",medicalIndex.medicalHistory)}
        {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
        {renderItems("Khám lâm sàng: ",medicalIndex.clinicalExamination)}
        {renderItems("Kết quả xét nghiệm (nếu có): ",medicalIndex.testResult)}
        {renderItems("Kết quả siêu âm (nếu có): ",medicalIndex.ultrasoundResult)}
        {renderItems("Điều trị: ",medicalIndex.treatment)}
    </View>
    );
  };
  const renderGynecological = () => {
    return (
        <View style={styles.container}>
        {renderItems("Tiền sử kinh nguyệt: ",medicalIndex.isEvenlyMenstrualHistory ? "Đều" : "Không đều")}
        {renderItems("Chu kỳ kinh nguyệt: ",medicalIndex.cycle)}
        {renderItems("Thời gian: ",medicalIndex.duringTime)}
        {renderItems("Số lượng: ",medicalIndex.quantity)}
        {renderItems("Mất công: ",medicalIndex.amenorrhea)}
        {renderItems("Rụng kinh bất thường: ",medicalIndex.menorrhagia)}
        {renderItems("Ra máu bất thường: ",medicalIndex.unusualBleeding)}
        {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
        {renderItems("Dấu hiệu khác: ",medicalIndex.otherSignal)}
        {renderItems("Tư vấn chăm sóc: ",medicalIndex.careAdvice)}
        {renderItems("Tầng sinh môn: ",medicalIndex.vulvaAndPerineal)}
        {renderItems("Âm đạo: ",medicalIndex.vagina)}
        {renderItems("Cổ tử cung: ",medicalIndex.cervical)}
        {renderItems("Tử cung - phần phụ: ",medicalIndex.uterusExtra)}
    </View>
    );
  };
  const renderAntenatalCare = () => {
    return (
        <View style={styles.container}>
        {renderItems("Chiều cao: ",medicalIndex.hight)}
        {renderItems("Cân nặng: ",medicalIndex.weight)}
        {renderItems("Tình trạng phù nề: ",medicalIndex.edemaStatus)}
        {renderItems("Huyết áp: ",medicalIndex.bloodPressure)}
        {renderItems("Nhiệt độ: ",medicalIndex.temperature)}
        {renderItems("Mạch: ",medicalIndex.pulse)}
        {renderItems("Cao tử cung: ",medicalIndex.uterus)}
        {renderItems("Cơn co tử cung: ",medicalIndex.uterineContractions ? "Có" : "Không")}
        {renderItems("Chu vi vòng eo: ",medicalIndex.waistCircumference)}
    </View>
    );
  };

  const renderBreast = () => {
    return (
        <View style={styles.container}>
        {renderItems("Tiền sử các bệnh về vú: ",medicalIndex.breastHistory)}
        {renderItems("Tình trạng kinh nguyệt hiện tại: ",medicalIndex.currentMenstrual)}
        {renderItems("Lý do đến khám: ",medicalIndex.reasonForExam)}
        {renderItems("Khám lâm sàng: ",medicalIndex.clinicalExamination)}
        {renderItems("Điều trị: ",medicalIndex.treatment)}
    </View>
    );
  };

  const renderData = () => {
    switch (mediaclCateCode) {
      case '6077ea00adc39165484fe82f':
        return renderTips();
      case '6077e9c2adc39165484fe82e':
        return renderReproductiveSupport();
      case '6077e889adc39165484fe82c':
        return renderLatePeriod();
      case '6077e6b6adc39165484fe82a':
        return renderInfertility();
      case '6077e8c8adc39165484fe82d':
        return renderPrelabor();
      case '6077e85badc39165484fe82b':
        return renderInternal();
      case '6077e687adc39165484fe829':
        return renderGynecological();
      case '6077e654adc39165484fe828':
        return renderBreast();
      case '6077e45b21bc3759c41a4a8f':
        return renderAntenatalCare();
      case '6077e44d21bc3759c41a4a8e':
        return renderAntenatalCare();
      case '6077e42921bc3759c41a4a8d':
        return renderAntenatalCare();
      default:
        return <Text style={{width:'100%',textAlign:'center',marginTop:scaledSize(20)}}>Không tìm thấy kết quả</Text>;
    }
  };
  return (
      <View>
{ medicalIndex && renderData()}
      </View>     
  )
      
};
const styles = StyleSheet.create({
  container: {
    marginTop: scaledSize(16),
    backgroundColor: AppColor.white,
    paddingBottom: scaledSize(16),
    paddingLeft: scaledSize(22),
    paddingRight: scaledSize(22),
    flexDirection: 'column'
  },
  itemsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:16
    // marginTop:scaledSize(16)
  }
});
export default MedicalDetail;
