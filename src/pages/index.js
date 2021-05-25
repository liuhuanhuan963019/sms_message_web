import { MailTwoTone, MobileTwoTone } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';

import { getFakeCaptcha, phoneLogin } from '@/service/login';

import styles from './index.less';

export default function({ history }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    let params = {
      phone: values.mobile,
      smsCode: values.captcha,
    };

    const result = await phoneLogin(params);
    if (result.code === 'OK') {
      message.success(result.msg);

      history.push('/home');
    } else {
      message.error(result.msg);
    }
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: loading,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async values => {
          handleSubmit(values);
        }}
      >
        <div>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileTwoTone className={styles.prefixIcon} />,
            }}
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <MailTwoTone className={styles.prefixIcon} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => (timing ? `${count} 获取验证码` : '获取验证码')}
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async mobile => {
              console.log(mobile, 'phone');
              const result = await getFakeCaptcha(mobile);

              message.success('获取验证码成功！请查看手机');
            }}
          />
        </div>
      </ProForm>
    </div>
  );
}
