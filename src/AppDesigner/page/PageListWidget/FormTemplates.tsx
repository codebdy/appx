import { Card, Col, Row } from "antd";
import React from "react";
import { memo } from "react";

const FormTemplates = memo(() => {

  return (
    <Row className="page-template-list" gutter={16}>
      <Col span={6}>
        <Card style={{textAlign: 'center'}}
        cover={<img alt="example" src="/public/img/blank.png" />}
        >
          新建空白页
        </Card>
      </Col>
      <Col style={{textAlign: 'center', padding:"8px"}} span={6}>
        <Card
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        >
          查询列表
        </Card>
      </Col>
      <Col style={{textAlign: 'center', padding:"8px"}} span={6}>
        <Card
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        >
          单表格
        </Card>
      </Col>

    </Row>
  )
})

export default FormTemplates;